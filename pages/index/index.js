import {Layout} from '../../containers';
import {connect} from 'react-redux';

import Style from './index.style';

const Index = ({ testList }) => {
  return (
    <Layout>
      <Style>
        { testList.join(',') }
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

