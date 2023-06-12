const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'm7buo4',
  env: {
    DEV_API: 'http://localhost:3000',
  },
  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'src/**/*.test.{js,ts,jsx,tsx}',
  },

  e2e: {
    baseUrl: 'http://localhost:8000',
    video: false,
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
