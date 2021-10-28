import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ZoomHeader = () => (
    <TitleStyle>
        <h1>gesture supported zoom demo👩‍💻🙋</h1>
        <p>
            Integrating some gesture interactions for zoom video call demo, for more intuitive communication while talking with someone over zoom.
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

export default ZoomHeader;
