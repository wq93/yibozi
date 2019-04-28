import React, {Component} from 'react';
import {Layout} from '../../containers';
import {connect} from 'react-redux';


import Style from './index.style';

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {testList} = this.props;
    return (
      <Layout>
        <Style>
          {testList.join(',')}
        </Style>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const {
    testList,
  } = state;
  return {testList};
}


export default connect(mapStateToProps)(Index);
