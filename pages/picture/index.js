import { useState } from 'react';
import { Modal } from 'antd';
import { Layout } from '../../containers';
import { fetchList } from '../../api';
import { PictureItem } from '../../components';
import { deletePicture } from '../../api';

const { confirm } = Modal;
import Style, { GlobalStyle } from './index.style';

// 获取列表方法
const fetchListFn = async (url) => {
  let list = [];
  try {
    const { code, data } = await fetchList(url);
    list = code === 0 ? data.list : [];
  } catch (error) {
    console.warn(error);
  }
  return list;
};

const Picture = ({ pictureList }) => {
  const [ pictures = [], setPictures ] = useState(pictureList);

  // 点击删除法
  const handleDeletePicture = (id) => {
    confirm({
      title: '删除',
      content: '确定要删除这张照片吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          await deletePicture(id);
        } catch (e) {
          console.warn(e);
        }finally {
          const pictureList = await fetchListFn('image');
          setPictures(pictureList);
        }
      },
    });
  };

  return (
    <Layout>
      <Style>
        { pictures.map(picture =>
          <PictureItem
            key={ picture.uuid } { ...picture }
            handleDeletePicture={ handleDeletePicture }/>) }
      </Style>
      <GlobalStyle/>
    </Layout>
  );
};

// InitialProps周期
Picture.getInitialProps = async () => {
  const pictureList = await fetchListFn('image');
  return { pictureList };
};

export default Picture;

