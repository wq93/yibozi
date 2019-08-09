// 编辑文章页面, 包括新增, 编辑
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { message } from 'antd';
import { Layout } from '../../../containers';
import { postArticle } from '../../../api';

import Styled from './index.style';

const DynamicBraftEditorNossr = dynamic(
  import('../../../components/MyBraftEditor'),
  { ssr: false }
);

const Editor = () => {
  const [ editorState, setEditorState ] = useState(null);
  // useEffect只在客户端调用
  useEffect(() => {
    const editorState = JSON.parse(localStorage.getItem('editorState') || '{}');
    setEditorState(editorState);
  }, []);

  // 保持文章方法
  const handleSubmitEditorState = async (submitData) => {
    try {
      const { code, data } = await postArticle(submitData);
      code === 0 ? message.success('保存文章成功') : message.error(`保持失败! ${ data.msg }`);
    } catch (error) {
      console.warn(error);
    }
  };

  return <Layout>
    <Styled>
      <DynamicBraftEditorNossr
        editorState={ editorState }
        handleSubmitEditorState={ handleSubmitEditorState }/>
    </Styled>
  </Layout>;
};

export default Editor;