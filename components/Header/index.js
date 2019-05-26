import Styled from './index.style';

const Header = () => {
  return (
    <Styled>
      <div className="header-operate">
        <div className="header-left"></div>
        <div className="header-middle">
          <img src="../../static/img/logo.png" alt=""/>
        </div>
        <div className="header-footer"></div>
      </div>
      <div className="header-navigation"></div>
    </Styled>
  );
};


export default Header;