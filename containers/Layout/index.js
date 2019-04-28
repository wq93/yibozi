import { Component } from 'react';

import { Header, Footer } from '../../components'
import Styled from './index.style';

class Layout extends Component {
  constructor(props){
    super( props );
  }


  render () {
    const { children } = this.props;
    return (
      <Styled>
        <Header></Header>
        <div id='main-content'>
          {children}
        </div>
        <Footer></Footer>
      </Styled>
    );
  }
}


export default Layout;