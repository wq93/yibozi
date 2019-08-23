import styled from 'styled-components';

export default styled.li`
   position: relative;
   width: 25%;
   padding: 8px;
   transform: ${ () => `rotate(${ Math.random() * (-20) + Math.random() * 20 }deg) translateY(${ Math.random() * (50) }px)` };
   div.picture-wrapper {
     padding: 4px;
     border: 3px solid #B4A078;
     overflow: hidden;
     img {
       display: inline-block;
       width: 100%;
       padding: 4px;
       border: 1px dashed #B4A078;
       cursor: pointer;
     }
     
   }
   
`;