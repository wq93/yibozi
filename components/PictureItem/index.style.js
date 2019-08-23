import styled from 'styled-components';

export default styled.li`
   position: relative;
   width: 20%;
   padding: 8px;
   transform: ${ () => `rotate(${ 0 }deg) translateY(${ 0 }px)` };
   div.picture-wrapper {
     position: relative;
     padding: 4px;
     border: 2px solid #B4A078;
     overflow: hidden;
     cursor: pointer;
     .mark {
       position: absolute;
       top: 0;
       width: 100%;
       height: 100%;
       background: rgba(255,255,255,0.6);
       z-index: 2;
       transition: all 0.8s;
     }
     .mark-left {
       left: -100%;
     }
     .mark-right {
       right: -100%;
       
     }
     img {
       display: inline-block;
       width: 100%;
       padding: 2px;
       border: 1px dashed #B4A078;
     }
     &:hover {
        .mark-left {
          left: -23%;
        }
        .mark-right {
          animation: markRight .5s;
          right: -80%;
        }
     }
      @keyframes markRight {
        from { right: -100%; }
        50%  { right: calc(-50%); } /* ignored */
        to   { right: -80%; }
     }
   }
`;