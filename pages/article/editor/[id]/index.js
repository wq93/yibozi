import dynamic from 'next/dynamic';
import Router from 'next/router';

import { Button, message } from 'antd';
import { Layout } from '../../../../containers';
import { deleteArticle, fetchArticle } from '../../../../api';

import Style from './index.style';

const DynamicEditorNossr = dynamic(
  import('../../../../components/MyBraftEditor'),
  { ssr: false }
);

const ArticleEdit = ({ articleMap, id }) => {
  // 删除文章
  const handleRemoveArticle = async () => {
    try {
      const { code } = await deleteArticle(id);
      if(code === 0){
        message.success('删除成功');
        Router.push('/article');
      }else{
        message.error('删除失败');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // 保持文章方法
  const handleSubmitEditorState = async (submitData) => {
    try {
      const { code, data } = await postArticle(submitData);
      if(code === 0){
        message.success('保存成功');
        Router.push('/article');
      }else {
        message.error(`保存失败! ${ data.msg }`);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Layout>
      <Style>
        <DynamicEditorNossr
          editorState={ articleMap }
          handleSubmitEditorState={ handleSubmitEditorState }/>
        <Button type='danger' block onClick={ handleRemoveArticle }>删除</Button>
      </Style>
    </Layout>
  );
};

ArticleEdit.getInitialProps = async (ctx) => {
  const { query: { id } } = ctx;
  let articleMap = {};

  try {
    const { data } = await fetchArticle(id);
    articleMap = data;
  } catch (error) {
    console.warn(error);
  }
  return { articleMap, id };
};

export default ArticleEdit;