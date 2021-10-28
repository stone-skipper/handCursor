import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => (
  <TitleStyle>
    <h1>hand cursor☝️ experiments</h1>
    <p>
      React.io / Tensorflow handpose model
      <br />
      experiment by stoneskipper  <a href="https://instagram.com/stone.skipper" target="_blank">
        @stone.skipper
      </a>
      <br />
      <a href="https://seungmee-lee.com" target="_blank">
        https://seungmee-lee.com
      </a>
    </p>
  </TitleStyle>
  // <div>
  //   <ul>
  //     <li>
  //       <Link to="/01">01</Link>
  //     </li>
  //     <li>
  //       <Link to="/02">02</Link>
  //     </li>
  //     <li>
  //       <Link to="/03">03</Link>
  //     </li>
  //   </ul>
  // </div>
);

const TitleStyle = styled.div`
font-family: 'Montserrat', sans-serif;

  color: #0016FF;
  z-index: 999;
  width: 30vw;
  height: 100vh;
  padding: 2vw;
  display:grid;
  grid-template-columns: 64vw 32vw;
  h1 {
    padding: 0;
    margin: 0;
    font-size: 1.5em;
  }
  p {
    font-size: 0.8em;
    line-height: 1.5;
    margin-top:-1px;
  }
  a {
    pointer: cursor;
  }
`;

export default Header;
