/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useCallback } from "react";
import Header from "../components/Header";
import HandStatus from "../components/HandStatus";
import InteractionNav from '../components/InteractionNav'
import Card from "../components/Card";

import styled from "styled-components";

const i02Click = () => {
  const [cursorX, setCursorX] = React.useState(null);
  const [cursorY, setCursorY] = React.useState(null);
  const [clicked1, setClicked1] = React.useState(null);
  const [clicked2, setClicked2] = React.useState(null);
  const [clickInfo, setClickInfo] = React.useState([])
  const [btnCollect, setBtnCollect] = React.useState([{}]);
  const [hovered, setHovered] = React.useState(null); //which one is hovered?
  const [handInfo, setHandInfo] = React.useState([])

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

  React.useEffect(() => {
    for (var i = 0; i < btnCollect.length; i++) {
      clickInfo[i] = false
    }
  }, [])

  const btnHoverCheck = (x, y) => {
    setHovered(null)
    for (var i = 0; i < btnCollect.length; i++) {
      if (
        y > btnCollect[i].top &&
        y < btnCollect[i].top + btnCollect[i].height &&
        x > btnCollect[i].left &&
        x < btnCollect[i].left + btnCollect[i].width
      ) {
        setHovered(i);
      }
    }


  };

  React.useEffect(() => {
    if (hovered !== null && clicked1 === true) {
      clickInfo[hovered] = !clickInfo[hovered]
      console.log(clickInfo)
    }
  }, [clicked1])


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
      <Header></Header>
      <InteractionNav handData={handInfo}></InteractionNav>
      <ButtonWrapper>
        <Card
          id={0}
          link=""
          width="18vw"
          height="28vw"
          borderColor="#0016FF"
          color="#0016ff"
          textColor="white"
          defaultColor="#EBECFF"
          hovering={hovered}
          clicked={clickInfo[0]}
          content={<h1>♠</h1>}
          btnCallback={(value) => {
            getBtnInfo(value);
          }}
        ></Card>
        <Card
          id={1}
          link=""
          width="18vw"
          height="28vw"
          borderColor="#0016FF"

          color="#0016ff"
          textColor="white"
          defaultColor="#EBECFF"

          hovering={hovered}
          clicked={clickInfo[1]}
          content={<h1>♥</h1>}
          btnCallback={(value) => {
            getBtnInfo(value);
          }}
        ></Card>
        <Card
          id={2}
          link=""
          width="18vw"
          height="28vw"
          borderColor="#0016FF"

          color="#0016ff"
          textColor="white"
          defaultColor="#EBECFF"

          hovering={hovered}
          clicked={clickInfo[2]}
          content={<h1>♦</h1>}
          btnCallback={(value) => {
            getBtnInfo(value);
          }}
        ></Card>
        <Card
          id={3}
          link=""
          width="18vw"
          height="28vw"
          borderColor="#0016FF"

          color="#0016ff"
          textColor="white"
          defaultColor="#EBECFF"
          hovering={hovered}
          clicked={clickInfo[3]}
          content={<h1>♣</h1>}
          btnCallback={(value) => {
            getBtnInfo(value);
          }}
        ></Card>
      </ButtonWrapper>
      <HandStatus
        interactionType=""
        detectOnStart={true}
        popup={true}
        parentCallback={(value) => {
          getHandInfo(value);
          setHandInfo(value)
        }}
        hovering={hovered}
      ></HandStatus>
    </div>
  );
};

const ButtonWrapper = styled.div`
  width: 90vw;
  position: absolute;
  left: 5vw;
  top: 35vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  z-index: -2;
`;

export default i02Click;
