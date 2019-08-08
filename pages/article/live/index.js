import Style from './index.style';
import { Layout } from '../../../containers';
import { ArticleItem } from '../../../components';

const live = () => {
  return (
    <Layout>
      <Style>
        <ul className='article-list'>
          <ArticleItem/>
          <ArticleItem/>
          <ArticleItem/>
          <ArticleItem/>
          <ArticleItem/>
          <ArticleItem/>
          <ArticleItem/>
          <ArticleItem/>
        </ul>
      </Style>
    </Layout>
  );
};

export default live;

