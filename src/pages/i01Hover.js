/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useCallback } from "react";
import Header from "../components/Header";
import HandStatus from "../components/HandStatus";
import HoverItem from "../components/HoverItem";
import InteractionNav from '../components/InteractionNav'

import styled from "styled-components";

const i01Hover = () => {
  const [msg, setMsg] = React.useState([]);
  const [cursorX, setCursorX] = React.useState(null);
  const [cursorY, setCursorY] = React.useState(null);
  const [clicked1, setClicked1] = React.useState(null);
  const [clicked2, setClicked2] = React.useState(null);
  const [clickedBtn, setClickedBtn] = React.useState(null)
  const [btnCollect, setBtnCollect] = React.useState([{}]);
  const [hovered, setHovered] = React.useState(null); //which one is hovered?
  const [handInfo, setHandInfo] = React.useState([])
  const hoverPadding = 5
  const hoverArray = [...Array(60).keys()]


  const getHandInfo = (childData) => {
    setCursorX(childData.x);
    setCursorY(childData.y);
    setClicked1(childData.indexTap);
    setClicked2(childData.middleTap);

    btnHoverCheck(childData.x, childData.y);
  };

  const getBtnInfo = (v) => {
    btnCollect[v.id] = {
      top: v.top,
      left: v.left,
      width: v.width,
      height: v.height,
    };
  };

  const btnHoverCheck = (x, y) => {
    for (var i = 0; i < btnCollect.length; i++) {
      if (
        y > btnCollect[i].top - hoverPadding &&
        y < btnCollect[i].top + btnCollect[i].height + hoverPadding &&
        x > btnCollect[i].left - hoverPadding &&
        x < btnCollect[i].left + btnCollect[i].width + hoverPadding
      ) {
        setHovered(i);
      } else if (y > btnCollect[i].top &&
        y < btnCollect[i].top + btnCollect[i].height &&
        x > btnCollect[i].left &&
        x < btnCollect[i].left + btnCollect[i].width && clicked1 === true) {
        setClickedBtn(hovered)
      }
    }
  };

  return (
    <div className="App">
      {/* <p
        style={{
          color: "white",
          fontSize: "50px",
          position: "absolute",
          top: 200,
          left: 400,
        }}
      >
        {cursorX}, {cursorY}, {hovered}
        <br></br>
      </p> */}
      <Title>hello.</Title>
      <Header></Header>
      <InteractionNav handData={handInfo}></InteractionNav>
      <HoverWrapper>
        {hoverArray.map((index) => {
          return (<HoverItem id={index}
            width="1.6vw"
            height="100vh"
            color="#0016FF"
            textColor="white"
            hovering={hovered}
            content={null}
            btnCallback={(value) => {
              getBtnInfo(value);
            }}></HoverItem>)

        })}

      </HoverWrapper>
      <HandStatus
        interactionType=""
        detectOnStart={true}
        popup={true}
        parentCallback={(value) => {
          getHandInfo(value);
          setHandInfo(value);
        }}
        hovering={hovered}
      ></HandStatus>
    </div>
  );
};

const Title = styled.div`
color: white;
font-size: 30em;
text-align: center;
position: absolute;
width:100%;
height:max-content;
font-weight: bold;
top: -50%;
transform: translateY(100%);
`

const HoverWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top:0;
  left:0;
  display: grid;
  grid-template-columns: repeat(60, 1fr);
  justify-items: center;
  align-items:center;
  z-index: -2;
`;

export default i01Hover;
