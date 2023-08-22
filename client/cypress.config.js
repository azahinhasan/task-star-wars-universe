import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:3004",
    specPattern: [
      "cypress/e2e/test1.searchByName.test.js",
      "cypress/e2e/test2.changePage.test.js",
      "cypress/e2e/test3.searchByNameChangePage.test.js",
    ],
  },
});
