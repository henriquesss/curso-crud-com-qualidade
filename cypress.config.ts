import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: false, // Don't create a video after each test
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
