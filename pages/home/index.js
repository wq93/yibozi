import {Layout} from '../../containers';
import {connect} from 'react-redux';
import Head from 'next/head';

import Style from './index.style';

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>YIBOZI</title>
      </Head>
      <Style>
        home
      </Style>
    </Layout>
  );
};

function mapStateToProps(state) {
  const {
    testList,
  } = state;
  return {testList};
}

export default connect(mapStateToProps)(Index);

