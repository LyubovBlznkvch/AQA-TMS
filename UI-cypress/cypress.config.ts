import { defineConfig } from "cypress";
import { baseUrl, assetsFolder, defaultWaitingTime } from "./cypress/support/constants/constants";
import AllureWriter from "@shelex/cypress-allure-plugin/writer"

export default defineConfig({
  e2e: {
    specPattern: "UI-cypress/cypress/e2e/**/*.cy.ts",
    baseUrl: baseUrl,
    defaultCommandTimeout: defaultWaitingTime * 5,
    supportFile: "UI-cypress/cypress/support/index.ts",
    videosFolder: `${assetsFolder}/videos`,
    downloadsFolder: `${assetsFolder}/downloads`,
    screenshotsFolder: `${assetsFolder}/screenshots`,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      AllureWriter(on, config);
      return config;
    },
    env: {
      allure: "true",
      allureResultsPath: `${assetsFolder}/allure-results`
    }

  },
});
