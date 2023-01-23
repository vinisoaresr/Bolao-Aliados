import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    p, h1, h2 {
      color: ${(props) => props.theme.colors.text};
    }
    
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }   
  }

  body {
    height: 100vh;
    width: 100vw;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: sans-serif;
    font-size: 14px;

    overflow: hidden;

    scrollbar-width: none; // Firefox
    -ms-overflow-style: none;  // Internet Explorer 10+ 

    *::-webkit-scrollbar { // WebKit 
      width: 0;
      height: 0;
    } 
  }
`;

export default GlobalStyle;
