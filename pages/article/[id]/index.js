import dynamic from 'next/dynamic';

import { Layout } from '../../../containers';
import { fetchArticle } from '../../../api';

import Style from './index.style';

const DynamicTypographyNossr = dynamic(
  import('../../../components/MyTypography'),
  { ssr: false }
);

const ArticleRead = ({ articleMap }) => {
  return (
    <Layout>
      <Style>
        <DynamicTypographyNossr { ...articleMap }/>
      </Style>
    </Layout>
  );
};

ArticleRead.getInitialProps = async (ctx) => {
  const { query: { id } } = ctx;
  let articleMap = {};

  try {
    const { data } = await fetchArticle(id);
    articleMap = data;
  } catch (error) {
    console.warn(error);
  }
  return { articleMap };
};

export default ArticleRead;