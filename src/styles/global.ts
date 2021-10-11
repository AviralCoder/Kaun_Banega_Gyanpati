import { createGlobalStyle } from "styled-components";

type globalStylePropsTypes = {
    bgColor: string;
};

export default createGlobalStyle<globalStylePropsTypes>`
   @import url('');
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Raleway';
   }
   body{
       background-color: ${(props) => props.bgColor};
   }

`;
