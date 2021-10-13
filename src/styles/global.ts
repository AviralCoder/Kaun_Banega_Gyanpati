import { createGlobalStyle } from "styled-components";
import { colors } from "../lib/colors/colors";

type globalStylePropsTypes = {
    bgColor: string;
};

export default createGlobalStyle<globalStylePropsTypes>`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Raleway';
   }
   body{
       background-color: ${(props) => props.bgColor};
       overflow-x: hidden;
   }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: ${colors.primary}; 
    }
    
    ::-webkit-scrollbar-thumb {
        background: ${colors.secondary}; 
    }

`;
