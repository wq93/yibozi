import { Button, Empty } from 'antd';
import Link from 'next/link';

import { fetchArticle } from '../../api';
import { Layout } from '../../containers';
import { ArticleItem } from '../../components';

import Style from './index.style';

const Live = ({ articleList = [] }) => {
  return (
    <Layout>
      <Style>
        <Link href='/article/editor'  as='/article/editor'>
          <a>
            <Button type="dashed" icon="highlight" block>写文章</Button>
          </a>
        </Link>

        {
          articleList.length > 0 ?
            <ul className='article-list'>
              {
                articleList.map(article => {
                  return <ArticleItem {...article}/>;
                })
              }
            </ul> :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }

      </Style>
    </Layout>
  );
};

Live.getInitialProps = async () => {
  let articleList = [];

  try {
    const { code, data } = await fetchArticle();
    articleList = code === 0 ? data.list : [];
  } catch (error) {
    console.warn(error);
  }

  return { articleList };
};
export default Live;