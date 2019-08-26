/**
 * 此文件定义了全局样式
 * storybook 中静态资源路径与应用中的不一致，所以为了兼容 storybook，
 * 在应用中使用此组件时时需要传入 staticPath='/static' 属性
 */

import normalize from '../node_modules/normalize.css/normalize.css';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${ normalize }

  html,
  body {
    scroll-behavior: smooth;
    transition: all .3s;
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'futura', 'Helvetica';
    font-weight: normal;
    line-height: 1.65;
    list-style: none;
    text-decoration: none;
    /* 去除原生标签特有的样式 */
    appearance: none;
    /* 去除移动端点击阴影 */
    -webkit-tap-highlight-color: transparent;
    /* 去除点击时的边框高亮 */
    outline: none;
    /* 让文字更细一些 */
    -webkit-font-smoothing: antialiased;
    /* 让移动端滑动更流畅一些吧！ */
    -webkit-overflow-scrolling: touch;
  }
  .global-loading {
    background: url('../static/img/loading.gif');
    background-size: cover;
  }
`;