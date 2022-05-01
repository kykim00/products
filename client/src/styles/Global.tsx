import { css } from "@emotion/react";

const GlobalStyle = css`
  body {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 20px;
    min-width: 400px;
  }
  ul,
  ol {
    list-style: none;
  }
  h3,
  h4,
  p {
    margin: 0;
  }
  a:link,
  a:visited,
  a:hover {
    color: black;
    text-decoration: none;
  }
`;
export default GlobalStyle;
