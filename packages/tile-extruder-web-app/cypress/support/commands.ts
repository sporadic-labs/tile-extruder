/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Chainable<Subject = any> {
    compareImages(actualImagePath: string, expectedImagePath: string): Chainable<Subject>;
  }
}

Cypress.Commands.add("compareImages", (actualImagePath: string, expectedImagePath: string) => {
  cy.readFile(actualImagePath, "base64").then((actualFile) => {
    cy.readFile(expectedImagePath, "base64").then((expectedFile) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Could not get canvas context");

      const actualImg = new Image();
      actualImg.src = `data:image/png;base64,${actualFile}`;
      const expectedImg = new Image();
      expectedImg.src = `data:image/png;base64,${expectedFile}`;

      return new Promise<void>((resolve) => {
        let loadedImages = 0;
        const checkLoaded = () => {
          loadedImages++;
          if (loadedImages === 2) resolve();
        };
        actualImg.onload = checkLoaded;
        expectedImg.onload = checkLoaded;
      }).then(() => {
        if (actualImg.width !== expectedImg.width || actualImg.height !== expectedImg.height) {
          throw new Error(
            `Image dimensions do not match: ${actualImg.width}x${actualImg.height} vs ${expectedImg.width}x${expectedImg.height}`
          );
        }

        canvas.width = actualImg.width;
        canvas.height = actualImg.height;

        ctx.drawImage(actualImg, 0, 0);
        const actualData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(expectedImg, 0, 0);
        const expectedData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        expect(actualData.length).to.equal(expectedData.length);

        for (let i = 0; i < actualData.length; i += 4) {
          const rDiff = Math.abs(actualData[i] - expectedData[i]);
          const gDiff = Math.abs(actualData[i + 1] - expectedData[i + 1]);
          const bDiff = Math.abs(actualData[i + 2] - expectedData[i + 2]);
          const aDiff = Math.abs(actualData[i + 3] - expectedData[i + 3]);

          if (rDiff > 0 || gDiff > 0 || bDiff > 0 || aDiff > 0) {
            throw new Error(
              `Pixel mismatch at index ${i}: 
                  Expected: [${expectedData[i]}, ${expectedData[i + 1]}, ${expectedData[i + 2]}, ${
                expectedData[i + 3]
              }]
                  Got: [${actualData[i]}, ${actualData[i + 1]}, ${actualData[i + 2]}, ${
                actualData[i + 3]
              }]
                  Diffs: [${rDiff}, ${gDiff}, ${bDiff}, ${aDiff}]`
            );
          }
        }
      });
    });
  });
});
