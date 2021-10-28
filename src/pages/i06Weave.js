/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useCallback } from "react";
import Header from "../components/Header";
import HandStatus from "../components/HandStatus";
import InteractionNav from '../components/InteractionNav'
import Placeholder from '../components/Placeholder'


import styled from "styled-components";





const i06Weave = () => {
    const [cursorX, setCursorX] = React.useState(0);
    const [cursorY, setCursorY] = React.useState(0);
    const [clicked1, setClicked1] = React.useState(null);
    const [clicked2, setClicked2] = React.useState(null);
    const [clickInfo, setClickInfo] = React.useState([])
    const [btnCollect, setBtnCollect] = React.useState([{}]);
    const [hovered, setHovered] = React.useState(null); //which one is hovered?
    const [handInfo, setHandInfo] = React.useState([])
    const [isDrawing, setIsDrawing] = React.useState("none")
    const [drawIndex, setDrawIndex] = React.useState(0)


    const [drawCollect, setDrawCollect] = React.useState([])
    const drawRef = useRef(null)
    var canvas = drawRef.current
    var w = window.innerWidth;
    var h = window.innerHeight;

    if (drawRef.current !== null) {
        var context = canvas.getContext("2d");
        context.width = w
        context.height = h

    }
    const getHandInfo = (childData) => {
        setCursorX(childData.x);
        setCursorY(childData.y);
        setClicked1(childData.indexTap);
        setClicked2(childData.middleTap);

        btnHoverCheck(childData.x, childData.y);
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

    function draw(ctx, cursorX, cursorY, click, nthTap) {

        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = nthTap % 2 === 0 ? '#0016FF' : '#EBECFF';
        if (click === "index") {
            ctx.beginPath();
            ctx.moveTo(cursorX, 0)
            ctx.lineTo(cursorX, h)
            ctx.stroke()
        } else if (click === "middle") {
            ctx.beginPath();
            ctx.moveTo(0, cursorY)
            ctx.lineTo(w, cursorY)
            ctx.stroke()
        }


    }

    function finishDraw(ctx, cursorX, cursorY) {
        setIsDrawing("none")
    }

    React.useEffect(() => {
        if (clicked1 === true) {
            setIsDrawing("index")
        } else if (clicked2 === true) {
            setIsDrawing("middle")
        }
        else if (clicked1 !== true && clicked2 !== true) {
            finishDraw()
        }

    }, [clicked1, clicked2])

    React.useEffect(() => {
        if (isDrawing === "index") {
            setDrawIndex(drawIndex + 1)
            draw(context, cursorX, cursorY, isDrawing, drawIndex);
        } else if (isDrawing === "middle") {
            setDrawIndex(drawIndex + 1)
            draw(context, cursorX, cursorY, isDrawing, drawIndex);
        }
    }, [isDrawing, cursorX, cursorY])

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
            {drawIndex === 0 ? <Placeholder content="Weave your patterns with index finger tap and middle finger tap"></Placeholder> : null}

            <canvas ref={drawRef} width={w} height={h} style={{
                position: "absolute",
                marginLeft: 0,
                marginRight: 0,
                left: 0,
                right: 0,
                top: 0,
                zIndex: -2,
            }}></canvas>
        </div >
    );
};


const ButtonWrapper = styled.div`
  width: 90vw;
  position: absolute;
  left: 5vw;
  top: 40vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  z-index: -2;
`;

export default i06Weave;
