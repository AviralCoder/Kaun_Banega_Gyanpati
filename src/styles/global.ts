import { createGlobalStyle } from "styled-components";

type globalStylePropsTypes = {
    bgColor: string;
};

export default createGlobalStyle<globalStylePropsTypes>`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
   }
   body{
       background-color: ${(props) => props.bgColor};
   }

`;
