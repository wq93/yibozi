import App, {Container} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import NProgress from 'nprogress';

import { GlobalStyle, defaultTheme, isServer } from '../utils';
import initStore from '../store';
import { fetchNavigationList } from '../store/navigation';


class CustomApp extends App {
  // 无论服务端和客户端都会进入getInitialProps
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // 获取整个app的通用数据, 且在服务端获取一次, 之后不再客户端获取
    // 通常用于时效性不高的数据
    try {
      isServer && await Promise.all([
        ctx.store.dispatch(fetchNavigationList())
      ]);
    }catch (error) {
      console.warn(error);
    }
    return {pageProps};
  }

  render() {
    Router.onRouteChangeStart = () => NProgress.start();
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();
    const {Component, pageProps, store} = this.props;
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
            <GlobalStyle></GlobalStyle>
          </Provider>
        </Container>
      </ThemeProvider>
    );
  }
}

export default (withRedux(initStore))(CustomApp);
