import styled from 'styled-components';

export default styled.li`
   position: relative;
   padding: 8px;
   break-inside: avoid;
   transform: ${ () => `rotate(${ 0 }deg) translateY(${ 0 }px)` };
   div.picture-wrapper {
     position: relative;
     padding: 4px;
     border: 2px solid #B4A078;
     overflow: hidden;
     cursor: pointer;
     img {
       display: inline-block;
       width: 100%;
       padding: 2px;
       border: 1px dashed #B4A078;
     }
   }
  
`;