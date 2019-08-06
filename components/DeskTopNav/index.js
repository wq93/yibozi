import { useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';


import Styled from './index.style';

const { SubMenu, Item, ItemGroup } = Menu;

const DeskTopNav = ({ navigation, router }) => {
  const [current, setCurrent] = useState(router.pathname);
  const handleClick = event => setCurrent(event.key);

  const renderNav = () => {
    const renderMenu = (menus) => {
      return menus.map(menu => {
        if(menu.child.length > 0){
          return  <SubMenu title={ menu.name } key={ `/${menu.key}` }>
            <ItemGroup>{ renderMenu(menu.child)}</ItemGroup>
          </SubMenu>;
        }else{
          return <Item key={ `/${menu.key}` }>
            <Link href={ menu.path } as={ menu.asPath }><a>{ menu.name }</a></Link>
          </Item>;
        }
      });
    };

    return (
      <Menu onClick={ handleClick } mode="horizontal" selectedKeys={[current]} >
        { renderMenu(navigation) }
      </Menu>
    );
  };


  return (
    <Styled>
      { renderNav() }
    </Styled>
  );
};

function mapStateToProps(state){
  const {
    navigation
  } = state;
  return {  navigation };
}

export default withRouter(connect( mapStateToProps )( DeskTopNav ));
