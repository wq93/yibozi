import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';

import Styled from './index.style';

const { SubMenu, Item, ItemGroup } = Menu;

const DeskTopNav = ({ navigation, router }) => {
  // 清除asPath的首字符'/'
  const [current, setCurrent] = useState(router.asPath.substr(1));

  const renderNav = () => {
    const renderMenu = (menus) => {
      return menus.map(menu => {
        const { child, name, key, asPath, path } = menu;
        if(child.length > 0){
          return  <SubMenu title={ name } key={ key }>
            <ItemGroup>{ renderMenu(child)}</ItemGroup>
          </SubMenu>;
        }else{
          return <Item key={ key }>
            <Link href={ path } as={ asPath }><a>{ name }</a></Link>
          </Item>;
        }
      });
    };

    return (
      <Menu onClick={ event => setCurrent(event.key) } mode="horizontal" selectedKeys={[current]} >
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

/**
 * @prop navigation 导航集合
 * @prop router 当前页面的路由数据
 */
DeskTopNav.PropTypes = {
  navigation:PropTypes.array,
  router:PropTypes.object,
};