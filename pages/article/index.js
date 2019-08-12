import { fetchArticle } from '../../api';
import { Layout } from '../../containers';
import { ArticleItem } from '../../components';

import Style from './index.style';

const Live = ({ articleList = [] }) => {
  return (
    <Layout>
      <Style>
        <ul className='article-list'>
          {
            articleList.map(article => {
              return <ArticleItem {...article}/>;
            })
          }
        </ul>
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