import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
  }

  body {
    background-color: Cornsilk;
    font-family: Verdana, sans-serif;
    margin: 0;
    padding 0;
  }

  h1 {
    color: DarkOliveGreen;
    font-size: 2.3em;
    margin-bottom: 1em;
  }

  h2 {
    font-size: 1.9em;
    margin-bottom: 0.5em;
  }

  h3 {
    font-size: 1.7em;
    margin-bottom: 0.3em;
  }

  h4 {
    font-size: 1.5em;
    margin-bottom: 0.2em;
  }

  a {
    color: DodgerBlue;
    text-decoration: none;
  }

  a:hover {
    color: MediumBlue;
    cursor: pointer;
  }

  a:active {
    color: black;
  }
`

export default GlobalStyle
