import Style from './index.style';
import { Layout } from '../../containers';
import { fetchList } from "../../api";

const Picture = () => {
  return (
    <Layout>
      <Style>
        picture
      </Style>
    </Layout>
  );
};

Picture.getInitialProps = async () => {
  let articleList = [];

  try {
    const { code, data } = await fetchList();
    articleList = code === 0 ? data.list : [];
  } catch (error) {
    console.warn(error);
  }

  return { articleList };
};

export default Picture;

