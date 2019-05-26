import { Header, Footer } from '../../components';
import Styled from './index.style';

const Layout = ({ children }) => {
  return (
    <Styled>
      <Header></Header>
      <div id='main-content'>
        {children}
      </div>
      <Footer></Footer>
    </Styled>
  );
};

export default Layout;