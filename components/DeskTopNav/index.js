import { useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';

import Styled from './index.style';

const { SubMenu } = Menu;

const DeskTopNav = ({ navigation }) => {
  console.log(navigation);
  const [current, setCurrent] = useState('');
  const handleClick = event => {
    console.log('click ', event);
    setCurrent(event.key);
  };
  return (
    <Styled>
      <Menu onClick={ handleClick } mode="horizontal" selectedKeys={[current]} >
        <Menu.Item key="mail">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Navigation Three - Submenu
            </span>
          }
        >
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="javascript:;" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    </Styled>
  );
};

function mapStateToProps(state){
  const {
    navigation
  } = state;
  return {  navigation };
}

export default connect( mapStateToProps )( DeskTopNav );
