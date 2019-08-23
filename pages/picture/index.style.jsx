import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  #main-content {
    background: url('../../static/img/picture-background.png') center bottom no-repeat transparent;
    background-size: 200px;
  }
`;

export default styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 45px;
`;