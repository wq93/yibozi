import { useState } from 'react';
import { Modal, Upload, message, Button, Icon } from 'antd';
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
        } finally {
          const pictureList = await fetchListFn('image');
          setPictures(pictureList);
        }
      },
    });
  };

  const uploadProps = {
    name: 'file',
    action: '/api/image/upload',
    supportServerRender: true,
    onChange: async (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file);
      }
      if (info.file.status === 'done') {
        message.success(`${ info.file.name } 上传成功`);
        // 刷新列表
        const pictureList = await fetchListFn('image');
        setPictures(pictureList);
      } else if (info.file.status === 'error') {
        message.error(`${ info.file.name } 上传失败`);
      }
    },
  };

  return (
    <Layout>
      <Style>
        <Upload { ...uploadProps } className='upload-wrapper'>
          <Button type="primary" ghost block>
            <Icon type="upload"/> 上传图片
          </Button>
        </Upload>
        <ul className='picture-list'>
          { pictures.map(picture =>
            <PictureItem
              key={ picture.uuid } { ...picture }
              handleDeletePicture={ handleDeletePicture }/>) }
        </ul>
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

