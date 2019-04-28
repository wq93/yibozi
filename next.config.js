const withCss = require('@zeit/next-css');

module.exports = withCss({
  webpack(config) {
    if (process.env.NODE_ENV === 'development') {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      });
    }

    return config;
  }
});