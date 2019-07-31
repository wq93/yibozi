import { DeskTopHeader, Footer } from '../../components';
import Styled from './index.style';

const Layout = ({ children }) => {
  return (
    <Styled>
      <DeskTopHeader />
      <div id='main-content'>
        {children}
      </div>
      <Footer />
    </Styled>
  );
};

export default Layout;