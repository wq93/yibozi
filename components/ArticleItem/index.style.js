import styled from 'styled-components';

export default styled.li`
   width: 49%;
   margin-bottom: 16px;
   .article-item-wrapper {
      .article-title {
        margin-right: 8px;
      }
      .article-item-desc {
        margin: 8px 0 16px 0;
        min-height: 23px;
        color: ${ props => props.theme.fontColor };
      }
      .right-bars {
        float: right;
        padding: 8px;
        cursor: pointer;
      }
      a {
        color: ${ props => props.theme.titleColor };
        font-size: 16px;
      }
   }
`;