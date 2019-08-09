import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Icon } from 'antd';

import Styled from './index.style';

const ArticleItem = ({ uuid, title, type, createTime, updateTime, description }) => {
  const [loading, setLoading] = useState(true);
  const typeMap = {
    '0': '生活',
    '1': '技术',
  };
  useEffect(function persistForm() {
    uuid && setLoading(false);
  }, []);
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
            <a>{ title }</a>
          </Link>
          <p className='right-bars'>
            <Icon type="edit" twoToneColor="#2c3e50"/>
          </p>
        </div>
        <div className='article-item-desc'>
          { description || ''}
        </div>
        <div className='tips'>
          <Icon type="pushpin" theme="twoTone" twoToneColor="#2c3e50" />&nbsp;
          <span>{ typeMap[type] }</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Icon type="clock-circle" />&nbsp;
          <span>{ updateTime || createTime }</span>
        </div>
      </Card>
    </Styled>
  );
};


export default ArticleItem;