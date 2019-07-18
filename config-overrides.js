const { override, addWebpackAlias, addBundleVisualizer } = require('customize-cra');
const path = require('path');

const overrides = [
  // Temporary fix the bundle size for antd icons
  // https://github.com/ant-design/ant-design/issues/12011#issuecomment-423173228
  addWebpackAlias({
    '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/assets/icons.js'),
  }),
  addBundleVisualizer(
    {
      analyzerMode: 'static',
      reportFilename: 'report.html',
    },
    true,
  ),
];

module.exports = override(...overrides);
