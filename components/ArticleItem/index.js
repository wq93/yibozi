import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Icon } from 'antd';

import Styled from './index.style';

const ArticleItem = () => {
  const [loading, setLoading] = useState(true);

  useEffect(function persistForm() {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  return (
    <Styled>
      <Card
        type='inner'
        hoverable
        loading={ loading }
        className='article-item-wrapper'>
        <div className='article-item-top'>
          <Icon type='read' className='article-title' />
          <Link href=''  as=''>
            <a>My article</a>
          </Link>
          <p className='right-bars'>
            <Icon type='bars' />
          </p>
        </div>
        <div className='article-item-desc'>
          这是这个文章的描述
        </div>
        <div className='tips'>
          <Icon type="pushpin" theme="twoTone" twoToneColor="#2c3e50" />&nbsp;&nbsp;
          <span>2019-08-09 08:08</span>
        </div>
      </Card>
    </Styled>
  );
};


export default ArticleItem;