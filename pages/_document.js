// _document仅在服务器端呈现，而不在客户端呈现
// 像onClick这样的事件处理程序无法添加到此文件中
import Document, {Head, Main, NextScript} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {

    // styled-components支持并发服务器端呈现，样式表重新合并。
    // 基本思想是，每次在服务器上呈现应用程序时，都可以创建ServerStyleSheet并向React树添加提供程序，该提供程序通过上下文API接受样式。
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: <>{ initialProps.styles }{ sheet.getStyleElement() }</>
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, user-scalable=0" />
          <link rel="shortcut icon" href="../static/img/favicon.ico" type="image/x-icon" />
        </Head>
        <body className="custom_class">
          <Main/>
          <NextScript/>
        </body>
      </html>
    );
  }
}