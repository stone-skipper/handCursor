/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useCallback } from "react";
import Header from "../components/Header";
import HandStatus from "../components/HandStatus";
import InteractionNav from '../components/InteractionNav'
import Placeholder from '../components/Placeholder'

import styled from "styled-components";





const i04Draw = () => {
    const [cursorX, setCursorX] = React.useState(0);
    const [cursorY, setCursorY] = React.useState(0);
    const [clicked1, setClicked1] = React.useState(null);
    const [clicked2, setClicked2] = React.useState(null);
    const [clickInfo, setClickInfo] = React.useState([])
    const [btnCollect, setBtnCollect] = React.useState([{}]);
    const [hovered, setHovered] = React.useState(null); //which one is hovered?
    const [handInfo, setHandInfo] = React.useState([])
    const [isDrawing, setIsDrawing] = React.useState(false)
    const [drawIndex, setDrawIndex] = React.useState(0)

    const [prevX, setPrevX] = React.useState(null)
    const [prevY, setPrevY] = React.useState(null)

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

    function initDraw(ctx, cursorX, cursorY) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0016FF';
        ctx.beginPath();
        setPrevX(cursorX)
        setPrevY(cursorY)
        console.log(prevX, prevY)
        ctx.moveTo(cursorX, cursorY)
    }

    function draw(ctx, cursorX, cursorY) {
        // ctx.quadraticCurveTo(midX, midY, cursorX, cursorY);

        ctx.lineTo(cursorX, cursorY)
        ctx.stroke()
    }

    function finishDraw(ctx, cursorX, cursorY) {
        setIsDrawing(false)
    }

    React.useEffect(() => {
        if (clicked1 === true) {
            setIsDrawing(true)
            // console.log(cursorX, cursorY)
            // draw(context, drawCollect, isDrawing)
            initDraw(context, cursorX, cursorY)


        } else if (clicked1 !== true) {
            finishDraw()
        }

    }, [clicked1])

    React.useEffect(() => {
        if (isDrawing === true) {
            // [lastX, lastY] = [cursorX, cursorY];
            setDrawIndex(drawIndex + 1)
            draw(context, cursorX, cursorY);

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
            {drawIndex === 0 ? <Placeholder content="Draw with index finger tap"></Placeholder> : null}

            <canvas ref={drawRef} width={w} height={h} style={{
                position: "absolute",
                marginLeft: 0,
                marginRight: 0,
                left: 0,
                right: 0,
                top: 0,
                zIndex: 100,
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

export default i04Draw;
