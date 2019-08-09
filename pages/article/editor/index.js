// 编辑文章页面, 包括新增, 编辑
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { Layout } from '../../../containers';

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
  const handleSubmitEditorState = (submitData) => {
    localStorage.setItem('editorState', submitData);
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