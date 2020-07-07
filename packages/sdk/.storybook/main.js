const { resolve } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

console.log(resolve(__dirname, '../'));

module.exports = {
  addons: ['@storybook/addon-notes/register', '@storybook/preset-typescript'],
  stories: ['../stories/*.stories.ts'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader'
      ]
    });

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, '../tsconfig.json')
      })
    ];
    // Return the altered config
    return config;
  }
};
