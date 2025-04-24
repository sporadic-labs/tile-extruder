const testCases = [
  {
    name: "Mario tileset",
    inputFile: "mario-tileset-16w16h-10spacing-5margin.png",
    expectedFile: "mario-tileset-16w16h-10spacing-5margin-5extrusion.png",
    tileWidth: "16",
    tileHeight: "16",
    extrusionAmount: "5",
    margin: "5",
    spacing: "10",
  },
  {
    name: "Arachne tileset",
    inputFile: "arachne-tileset-8w8h-0spacing-0margin.png",
    expectedFile: "arachne-tileset-8w8h-0spacing-0margin-1extrusion.png",
    tileWidth: "8",
    tileHeight: "8",
    extrusionAmount: "1",
    margin: "0",
    spacing: "0",
  },
  {
    name: "Checker tileset",
    inputFile: "checker-3w4h-1spacing-0margin.png",
    expectedFile: "checker-3w4h-1spacing-0margin-2extrusion.png",
    tileWidth: "3",
    tileHeight: "4",
    extrusionAmount: "2",
    margin: "0",
    spacing: "1",
  },
];

describe("Tile Extruder", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  testCases.forEach((testCase) => {
    it(`should process ${testCase.name} correctly - ${testCase.tileWidth}x${testCase.tileHeight}, extrusion ${testCase.extrusionAmount}, margin ${testCase.margin}, spacing ${testCase.spacing}`, () => {
      cy.get('input[type="file"]').selectFile(`cypress/fixtures/${testCase.inputFile}`, {
        force: true,
      });

      cy.get('[data-cy="extruded-tileset-canvas"]').should("be.visible");

      cy.get('input[name="tileWidth"]').clear().type(testCase.tileWidth);
      cy.get('input[name="tileHeight"]').clear().type(testCase.tileHeight);
      cy.get('input[name="extrusionAmount"]').clear().type(testCase.extrusionAmount);
      cy.get('input[name="margin"]').clear().type(testCase.margin);
      cy.get('input[name="spacing"]').clear().type(testCase.spacing);

      cy.get("button").contains("upload").click();

      cy.compareImages(
        "cypress/downloads/extruded-tileset.png",
        `cypress/fixtures/${testCase.expectedFile}`
      );
    });
  });
});
