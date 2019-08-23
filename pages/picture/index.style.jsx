import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  #main-content {
    //background: url('../../static/img/picture-background.png') center bottom no-repeat, linear-gradient(-45deg, skyblue, #ffffff);
    background: linear-gradient(-45deg, skyblue, #ffffff);
    background-size: contain;
  }
`;

export default styled.div`
  .upload-wrapper {
    display: block;
    .ant-upload {
      width: 100%;
    }
    .ant-upload-list {
      display: none;
    }
  }
  ul.picture-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 45px;  
  }
`;