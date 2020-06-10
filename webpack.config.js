module.exports = {
  mode:               'production',
  devtool:            'source-map',
  target:             'node',
  entry:              `${__dirname}/src/main.js`,
  output: {
    path:             `${__dirname}/dist`,
    filename:         'liquidjs.js',
    libraryTarget:    'umd',
  },
  optimization: {
    // destination is node so not necessary
    minimize:         false,
  },
};
