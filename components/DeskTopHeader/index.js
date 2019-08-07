import Link from 'next/link';

import { DeskTopNav } from '../index';
import Styled from './index.style';

const Header = () => {

  return (
    <Styled>
      <div className="header-operate">
        <div className="header-left"></div>
        <div className="header-middle">
          <Link href='/'  as='/home'><a>
            <img src="../../static/img/logo.png" alt=""/>
          </a></Link>
        </div>
        <div className="header-footer"></div>
      </div>
      <DeskTopNav/>
    </Styled>
  );
};


export default Header;