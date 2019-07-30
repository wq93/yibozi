// 此文件用于创建 axios 实例
import axios from 'axios';
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
} from 'axios-extensions';
import NProgress from 'nprogress';

import {apiConfig, isServer} from '../utils';
import '../node_modules/nprogress/nprogress.css';

NProgress.configure({showSpinner: false});

const instance = axios.create({
  timeout: 60000,
  baseURL: apiConfig.baseURL,
  headers: {
    post: {'Content-Type': 'application/x-www-form-urlencoded'},
  },
  /**
   * throttleAdapterEnhancer(): 将请求进行缓存，默认缓存五分钟
   * cacheAdapterEnhancer(): 限制一定时间范围内的请求次数，默认 1s 内限制请求 1次
   */
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false,
  })),
});

instance.interceptors.request.use(
  request => {
    !isServer && NProgress.start();
    return request;
  },
  error => {
    !isServer && NProgress.done();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    !isServer && NProgress.done();
    return response.data;
  },
  error => {
    !isServer && NProgress.done();
    return Promise.reject(error);
  }
);

export default instance;