import { Modal } from 'antd';
import { Layout } from '../../containers';
import { fetchList } from '../../api';
import { PictureItem } from '../../components';
import { deletePicture } from '../../api';

const { confirm } = Modal;
import Style, { GlobalStyle } from './index.style';

const Picture = ({ pictureList }) => {

  const handleDeletePicture = (id) => {
    confirm({
      title: '删除',
      content: '确定要删除这张照片吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try{
          await deletePicture(id);
        }catch (e) {
          console.warn(e);
        }
      },
    });
  };

  return (
    <Layout>
      <Style>
        { pictureList.map(picture =>
          <PictureItem
            key={ picture.uuid } { ...picture }
            handleDeletePicture={ handleDeletePicture }/>) }
      </Style>
      <GlobalStyle/>
    </Layout>
  );
};

Picture.getInitialProps = async () => {
  let pictureList = [];

  try {
    const { code, data } = await fetchList('image');
    pictureList = code === 0 ? data.list : [];
  } catch (error) {
    console.warn(error);
  }

  return { pictureList };
};

export default Picture;

