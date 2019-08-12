import { useRouter } from 'next/router';

import { Layout } from '../../../containers';

import Style from './index.style';

const ArticleCheck = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);
  return (
    <Layout>
      <Style>
        ArticleRead : {id}
      </Style>
    </Layout>
  );
};

// ArticleEdit.getInitialProps = async (ctx) => {
//
// };

export default ArticleCheck;