import { defineConfig } from "cypress";
import fs from "node:fs";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    downloadsFolder: "cypress/downloads",
    video: false,
    setupNodeEvents(on, config) {
      on("task", {
        clearDownloads() {
          fs.rmSync(config.downloadsFolder, { recursive: true, force: true });
          return null;
        },
      });
    },
  },
});
