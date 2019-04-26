import React, { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import Head from 'next/head';

import Style from './index.style'
const Home = () => (
  <Style>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title>Next-Antd-Scafflod</title>
      <link rel='stylesheet' href='/_next/static/style.css' />
    </Head>
    <Fragment>
      <h1>我是Next的首页</h1>
      <Link href='/userList'>
        <Button type='primary'>用户列表页</Button>
      </Link>
      <p className='test'>你好</p>
    </Fragment>
  </Style>
);
export default Home;
