const path = require('path');

module.exports = function override(config, env) {
  const analyzeBundle = process.argv.indexOf('--analyze-bundle') !== -1;

  if (analyzeBundle) {
    const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: 'static',
      reportFilename: 'report.html',
    });
  }

  // temporary fix the bundle size for antd icons
  // https://github.com/ant-design/ant-design/issues/12011#issuecomment-423173228
  const alias = config.resolve.alias || {};
  alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './src/assets/icons.js');

  config.resolve.alias = alias;

  return config;
};
