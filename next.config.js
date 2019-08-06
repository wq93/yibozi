/* eslint-disable */
const withCss = require('@zeit/next-css');

module.exports = withCss({
  // 只编译后缀为.js文件
  pageExtensions: ['js'],
  webpack: (config, { isServer }) => {
    if (process.env.NODE_ENV === 'development') {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      });
    }

    // 集成antd
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
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