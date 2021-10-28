import React, { useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import pageTurner from "../components/PageTurner";
import styled, { keyframes } from "styled-components";

const HandStatus = (props) => {
  const { interactionType, detectOnStart, parentCallback, hovering, popup } = props;
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  const [handLoad, setHandLoad] = React.useState(detectOnStart);
  const [clicked1, setClicked1] = React.useState(false);
  const [clicked2, setClicked2] = React.useState(false);
  const [videoToggle, setVideoToggle] = React.useState(false);
  const [cursorPos, setCursorPos] = React.useState({ x: null, y: null });
  const [statusToggle, setStatusToggle] = React.useState(true);
  const [handDrawToggle, setHandDrawToggle] = React.useState(true);
  const [intervalId, setIntervalId] = React.useState(undefined);

  var hand;
  var clickCheck1, clickCheck2, posCheck;
  var w = window.innerWidth;
  var h = window.innerHeight;

  const sendData = (value) => {
    parentCallback(value);
  };

  const runHandpose = async (handLoad) => {
    const net = await handpose.load({
      // maxContinousChecks: 10,
      detectionConfidence: 0.8,
    });
    startDetect(net);
  };

  const startDetect = (net) => {
    setIntervalId(
      setInterval(() => {
        detect(net);
      }, 10)
    );
  };

  const stopDetect = () => {
    clearInterval(intervalId);
    setHandDrawToggle(false);
    setCursorPos({ x: null, y: null });
  };

  const detect = async (net) => {
    //Check if data(video) is available > get video properties and set them for video and canvas size, make detection, and draw mesh
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //get video info
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //set video info
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //set canvas info
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      canvasRef2.current.width = videoWidth;
      canvasRef2.current.height = videoHeight;

      //make detection

      if (net !== undefined) {
        hand = await net.estimateHands(video);
      }
      //draw(ctx is for hand skeleton, ctx2 is for the interaction)
      const ctx = canvasRef.current.getContext("2d");
      const ctx2 = canvasRef2.current.getContext("2d");

      ctx.translate(videoWidth, 0);
      ctx.scale(-1, 1);
      ctx2.translate(videoWidth, 0);
      ctx2.scale(-1, 1);

      clickCheck1 = pageTurner(hand, ctx, ctx2)[0];
      clickCheck2 = pageTurner(hand, ctx, ctx2)[1];
      posCheck = pageTurner(hand, ctx, ctx2)[2];
      setClicked1(clickCheck1);
      setClicked2(clickCheck2);

      setCursorPos({
        x: (w - (posCheck.x / videoWidth) * w).toFixed(0),
        y: ((posCheck.y / videoHeight) * h).toFixed(0),
      });

      sendData({
        x: (w - (posCheck.x / videoWidth) * w).toFixed(0),
        y: ((posCheck.y / videoHeight) * h).toFixed(0),
        indexTap: pageTurner(hand, ctx, ctx2)[0],
        middleTap: pageTurner(hand, ctx, ctx2)[1],
      });
    }
  };

  React.useEffect(() => {
    if (handLoad === true) {
      runHandpose(handLoad);
      setHandDrawToggle(true);
    } else {
      stopDetect();
    }
  }, [handLoad]);

  return (
    <div className="App">

      <StatusWrapper statusToggle={statusToggle} cursorPos={cursorPos}>
        <div
          className="titleWrapper"
          onClick={() => {
            setStatusToggle(!statusToggle);
          }}
        >
          <h2>status / controls</h2>
          <p
            onClick={() => {
              setStatusToggle(!statusToggle);
            }}
          >
            {statusToggle ? "SHOW" : "HIDE"}
          </p>
        </div>

        <ModelStatus handLoad={handLoad}>
          Hand Model : {handLoad ? "Model Loaded" : "Waiting for Model"}
        </ModelStatus>
        <HandStat cursorPos={cursorPos}>
          Hand Detection :
          {cursorPos.x !== null && cursorPos.y > 0
            ? "Hand Detecting"
            : "No Hand Detected"}
        </HandStat>
        <ClickStatus
          clicked1={clicked1}
          clicked2={clicked2}
        // parentCallback={sendData(clicked1)}
        >
          Click : {clicked1 ? "index" : "-"}
          {clicked2 ? "thumb" : "-"}
        </ClickStatus>
        <CursorStatus>
          hand cursor x : {cursorPos.x}
          <br />
          hand cursor y : {cursorPos.y}
          <br />
        </CursorStatus>
        <HoverStatus>Hovering : {hovering}</HoverStatus>
        <div
          style={{
            width: "100%",
            // padding: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            justifyItems: "center",
            alignContent: "space-evenly",
            textAlign: "center",
            margin: "10px auto",
          }}
        >
          <VideoToggle
            videoToggle={videoToggle}
            onClick={() => {
              setVideoToggle(!videoToggle);
            }}
          >
            <div></div>
            Video <br />
            {videoToggle ? "ON" : "OFF"}
          </VideoToggle>
          <ModelToggle
            handLoad={handLoad}
            onClick={() => {
              setHandLoad(!handLoad);
            }}
          >
            <div></div>
            Model
            <br /> {handLoad ? "ON" : "OFF"}
          </ModelToggle>
          <HandDrawToggle
            handDrawToggle={handDrawToggle}
            onClick={() => {
              setHandDrawToggle(!handDrawToggle);
              // console.log(handDrawToggle);
            }}
          >
            <div></div>
            Hand
            <br /> {handDrawToggle ? "ON" : "OFF"}
          </HandDrawToggle>
        </div>
      </StatusWrapper>

      <Webcam
        mirrored={true}
        ref={webcamRef}
        videoConstraints={{ aspectRatio: w / h }}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: 0,
          textAlign: "center",
          zIndex: videoToggle ? 10 : -10,
          width: w,
          opacity: videoToggle ? 0.4 : 0,
          // display: handLoad ? "block" : "none",
          height: h,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: 0,
          marginRight: 0,
          left: 0,
          right: 0,
          top: 0,
          textAlign: "center",
          // zIndex: 12,
          zIndex: videoToggle ? 12 : -1,
          width: w,
          height: h,
          display: handDrawToggle ? "block" : "none",
          //   display: videoToggle ? "block" : "none",
        }}
      />
      <canvas
        ref={canvasRef2}
        style={{
          position: "absolute",
          marginLeft: 0,
          marginRight: 0,
          left: 0,
          right: 0,
          top: 0,
          textAlign: "center",
          // zIndex: 12,
          zIndex: videoToggle ? 12 : -1,
          width: w,
          height: h,
          //   display: videoToggle ? "block" : "none",
        }}
      />
      <HandLoadingPopup cursorPos={cursorPos} popup={popup}>
        <PopupWrapper cursorPos={cursorPos} popup={popup}>
          <h1>loading hand model...<HandAnim >
            <span></span>
          </HandAnim></h1><br />
        please grant an access to your webcam / camera, <br />
and raise your hand in front of your screen and wait.<br /><br />
not too close! keep a bit of distance <br />to make sure the hand is within the camera and the screen.
</PopupWrapper>
      </HandLoadingPopup>
    </div >
  );
};

const HandLoadingPopup = styled.div`
font-family: 'Montserrat', sans-serif;

width:100vw;
height:100vh;
position:fixed;
top:0;
left:0;
z-index: 1000;
display: ${props => props.cursorPos.x !== null && props.cursorPos.y > 1 || props.popup === false ? "none" : "flex"};
background: rgba(0, 22, 255, 0.9);
align-items:center;
justify-items:center;
`

const PopupWrapper = styled.div`
text-align:center;
height:max-content;
background:rgba(255,255,255,0.2);
color:white;
width:40vw;
margin:0 auto;
padding: 20px 20px 50px 20px;
border-radius: 20px;  
line-height:1.5;


h1{
  font-size:2.2em;
  margin:-10px;
  padding:0;
  padding-bottom:10px;
  height:auto;

}

`


const textAnim = keyframes`
0%{
  content:"✋";
}
50%{
  content:"🖖";
}
100%{
  content:"✋";
}
`

const HandAnim = styled.p`
display:inline-block;
height:0;
span::before{
  content:"✋";
  animation: ${textAnim} 1s linear infinite;
}
}
`

const StatusWrapper = styled.div`
font-family: 'Montserrat', sans-serif;

  background-color: #EBECFF;
  width: 250px;
  height: ${(props) => (props.statusToggle ? "50px" : "360px")};
  transform: translateY(100%);
  z-index: 999;
  position: absolute;
  bottom: ${(props) => (props.statusToggle ? "50px" : "360px")};
  left: 2.5vw;
  color: #0016FF;
  font-size: 0.8em;
  border-top: ${(props) =>
    props.cursorPos.x !== null && props.cursorPos.y > 1
      ? "3px solid #0016FF"
      : "3px solid grey"};
  .titleWrapper {
    width: 100%;
    cursor: pointer;
    padding-top: 16px;
  }
  h2 {
    padding: 0;
    margin-top: 0;
    margin-left: 16px;
    font-size: 1em;
    width: 100%;
    margin-bottom: 0;
  }
  p {
    margin-left: -16px;
    font-size: 0.9em;
    font-weight: bold;
    opacity: ${(props) => (props.statusToggle ? 0.2 : 0.5)};
    width: 100%;
    text-align: right;
    transform: translate(0, -200%);
    margin-bottom: 0;
  }
`;

const ModelStatus = styled.div`
  font-size: 0.8em;
  padding: 16px;
  color: ${props => props.handLoad ? "white" : "#0016FF"};
  background-color: ${(props) =>
    props.handLoad ? "#0016FF" : "rgba(255,255,255,0.1)"};
`;

const HandStat = styled.div`
  font-size: 0.8em;
  padding: 16px;
color: ${(props) =>
    props.cursorPos.x !== null && props.cursorPos.y > 1
      ? "white"
      : "#0016FF"};
  background-color: ${(props) =>
    props.cursorPos.x !== null && props.cursorPos.y > 1
      ? "#0016FF"
      : "rgba(255,255,255,0.1)"};
`;

const ClickStatus = styled.div`
  font-size: 0.8em;
  padding: 16px;
  background-color: ${(props) => {
    if (props.clicked1 === true) {
      return "blue";
    } else if (props.clicked2 === true) {
      return "purple";
    } else {
      return "rgba(255,255,255,0.1)";
    }
  }};
`;

const CursorStatus = styled.div`
  font-size: 0.8em;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.1);
`;
const HoverStatus = styled.div`
  font-size: 0.8em;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const VideoToggle = styled.div`
  font-size: 0.8em;
  padding: 8px;
  border-radius: 5px;
  width: 50px;
  cursor: pointer;
  background-color: rgba(0, 22, 255, 0.1);

  div {
    margin: 0 auto;
    margin-bottom: 2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) =>
    props.videoToggle ? "#0016FF" : "white"};
  }
`;
const ModelToggle = styled.div`
  font-size: 0.8em;
  padding: 8px;
  border-radius: 5px;
  width: 50px;
  cursor: pointer;
  background-color: rgba(0, 22, 255, 0.1);

  div {
    margin: 0 auto;
    margin-bottom: 2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) =>
    props.handLoad ? "#0016FF" : "white"};
  }
`;

const HandDrawToggle = styled.div`
  font-size: 0.8em;
  padding: 8px;
  border-radius: 5px;
  width: 50px;
  cursor: pointer;
  background-color: rgba(0, 22, 255, 0.1);
  div {
    margin: 0 auto;
    margin-bottom: 2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) =>
    props.handDrawToggle ? "#0016FF" : "white"};
  }
`;

export default HandStatus;
