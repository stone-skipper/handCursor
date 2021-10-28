import React, { useRef } from "react";

import HandStatus from "../components/HandStatus";
import styled from "styled-components";
import ReadyButton from '../components/ReadyButton'
import Heatmap from "../components/Heatmap"



function Main() {
  const [cursorX, setCursorX] = React.useState(null);
  const [cursorY, setCursorY] = React.useState(null);
  const [clicked1, setClicked1] = React.useState(null);
  const [clicked2, setClicked2] = React.useState(null);
  const [clickInfo, setClickInfo] = React.useState([])
  const [btnCollect, setBtnCollect] = React.useState([{}]);
  const [hovered, setHovered] = React.useState(null); //which one is hovered?

  const [heat, setHeat] = React.useState([{}])


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
      <Heatmap cX={cursorX} cY={cursorY}></Heatmap>

      <Title>
        <h1>hand is your mouse<br />move your ✋, 👌 to click</h1>

        <p>This web-experiment uses Handpose model from Tensorflow(https://github.com/tensorflow/tfjs-models/tree/master/handpose), using webcam video to recognize your hand and its movement. The work is still in process to apply those interaction experiments into feasible usecases. </p>
      </Title>

      <ItemWrapper>
        <ReadyButton
          id={0}
          width="26vw"
          height="10vh"
          color="white"
          defaultColor="transparent"
          textColor="#0016FF"
          link="/interactions"
          hovering={hovered}
          clicked={clickInfo[0]}
          content={<h1>experiments</h1>}
          btnCallback={(value) => {
            getBtnInfo(value);
          }}
        ></ReadyButton>
        <ReadyButton
          id={1}
          width="26vw"
          height="10vh"
          color="white"
          defaultColor="transparent"
          textColor="#0016FF"
          link="/zoom"
          hovering={hovered}
          clicked={clickInfo[1]}
          content={<h1>zoom demo</h1>}
          btnCallback={(value) => {
            getBtnInfo(value);
          }}
        ></ReadyButton>
      </ItemWrapper>

      <HandStatus
        interactionType=""
        detectOnStart={true}
        popup={true}
        parentCallback={(value) => {
          getHandInfo(value);
        }}
        hovering={hovered}
      ></HandStatus>
    </div>
  );
}

const BodyWrapper = styled.div`

  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 30vw 70vw;
  position: fixed;
  grid-gap: 0;
`;

const Title = styled.div`
font-family: 'Montserrat', sans-serif;

color:#0016FF;
z-index: 999;
width: 40vw;
height: 100vh;
padding: 2vw;
display: grid;
grid-template-columns: 64vw 32vw;

h1 {
  padding: 0;
  margin: 0;
  font-size: 3em;

}
p {
  font-size: 0.8em;
  line-height: 1.5;

}
a {
  pointer: cursor;
}
`

const ItemWrapper = styled.div`
  position: absolute;
  width: 34vw;
  height: 25vh;
  left:66vw;
  top:50vh;
  display:grid;
  grid-template-columns:repeat(1, 1fr);
  grid-row-gap:0vh;
  color: white;
  z-index: -5;
`;

export default Main;
