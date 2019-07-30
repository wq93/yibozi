// 此文件用来配置项目中的基本路径

const port = parseInt(process.env.PORT, 10) || 8000;

const envUrl = {
  development: {
    baseURL: `http://localhost:${ port }/api`,
  },
  production: {
    baseURL: `http://localhost:${ port }/api`,
  },
};

export default {
  baseURL: envUrl[process.env.NODE_ENV].baseURL || '',
};