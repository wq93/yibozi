import Router, { useRouter } from 'next/router';

import { Button, message } from 'antd';
import { Layout } from '../../../../containers';
import { deleteArticle } from '../../../../api';

import Style from './index.style';

const ArticleEdit = () => {
  const router = useRouter();
  const { id } = router.query;

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

  return (
    <Layout>
      <Style>
        ArticleEdit : { id }
        <Button type='danger' block onClick={ handleRemoveArticle }>删除</Button>
      </Style>
    </Layout>
  );
};

// ArticleEdit.getInitialProps = async (ctx) => {
//
// };

export default ArticleEdit;