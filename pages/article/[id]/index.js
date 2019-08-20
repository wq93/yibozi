import { Typography } from 'antd';

import { Layout } from '../../../containers';
import { fetchArticle } from '../../../api';

import Style from './index.style';

const { Title } = Typography;

const ArticleRead = ({ articleMap }) => {
  const { title, content } = articleMap;

  return (
    <Layout>
      <Style>
        <Typography>
          <Title>{ title }</Title>
          <div dangerouslySetInnerHTML={{'__html': content}} />
        </Typography>
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