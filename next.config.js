const withCss = require('@zeit/next-css');

module.exports = withCss({
  // 只编译后缀为.js文件
  pageExtensions: ['js'],
  webpack(config) {
    if (process.env.NODE_ENV === 'development') {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      });
    }

    return config;
  },

  generateBuildId: () => {
    // 使用最后一次提交的 hash 作为构建的 id
    const data = require('child_process')
      .execSync('git rev-parse HEAD')
      .toString().trim();
    return data;
  },
});