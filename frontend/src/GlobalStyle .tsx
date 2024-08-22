import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: 'Pretendard-Regular', Arial, sans-serif;
    transition: background-color 0.3s, color 0.3s;
  }
  a {
    color: ${({ theme }) => theme.text};
  }
`;