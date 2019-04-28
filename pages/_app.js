import App, {Container} from 'next/app';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';

import {GlobalStyle, defaultTheme} from '../utils';
import initStore from '../store';

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({Component, router, ctx}) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      return {pageProps}
    }

    render() {
      const {Component, pageProps, store} = this.props
      return (
        <ThemeProvider theme={defaultTheme}>
          <Container>
            <Provider store={store}>
              <Component {...pageProps} />
              <GlobalStyle></GlobalStyle>
            </Provider>
          </Container>
        </ThemeProvider>
      )

    }
  })
