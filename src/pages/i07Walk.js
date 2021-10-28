/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useCallback } from "react";
import Header from "../components/Header";
import HandStatus from "../components/HandStatus";
import InteractionNav from '../components/InteractionNav'
import Placeholder from '../components/Placeholder'

import styled, { keyframes } from "styled-components";





const i07Walk = () => {
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
        if (isDrawing === "index" && drawCollect[0] !== "left") {
            setDrawCollect((prev) => ["left", ...prev])
            // draw(context, isDrawing, drawIndex);
        } else if (isDrawing === "middle" && drawCollect[0] !== "right") {
            setDrawCollect((prev) => ["right", ...prev])
            // draw(context, isDrawing, drawIndex);
        }
        console.log(drawCollect)

    }, [isDrawing])

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

            <div style={{
                width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, perspective: "400px"
            }}>
                {drawCollect.length === 0 ? <Placeholder content="Walk with your fingers - try index finger tap and middle finger tap."></Placeholder> : null}
                <StepWrapper>
                    {drawCollect.map((value, index) => {
                        return (

                            <Step key={index} side={value} index={index}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><path d="M 45.5 50 L 30 50 C 30 50 13.774 3.5 38 3.5 C 62.226 3.5 49.019 27.066 47 35.5 C 44.981 43.934 45.5 50 45.5 50 Z" fill="#0016ff"></path><path d="M 30 53.5 L 45.5 53.5 C 45.5 53.5 49.156 69 38 69 C 26.844 69 30 53.5 30 53.5 Z" fill="#0016ff"></path></svg>
                            </Step>)
                    })}
                </StepWrapper>

            </div>
            {/* <canvas ref={drawRef} width={w} height={h} style={{
                position: "absolute",
                marginLeft: 0,
                marginRight: 0,
                left: 0,
                right: 0,
                top: 0,
                zIndex: -2,
            }}></canvas> */}
        </div >
    );
};

const StepWrapper = styled.div`
width:9vw;
height:60vh;
position:absolute;
top:30vh;
left:45vw;
transform:rotate3d(1,0,0, 45deg);

`


const stepAnim = keyframes`
0% {opacity:1; transform:blur(0);}

50% {opacity:1; transform:blur(0);}
100% {opacity:0; transform:blur(20px);}
`
const Step = styled.div`
transform:${props => props.side === "left" ? "scaleX(1)" : "scaleX(-1)"};
// animation-name:${props => props.index > 2 ? stepAnim : "none"};
// opacity:${props => props.index > 1 ? 0.5 : 1};

opacity ${props => {
        if (props.index === 0 || props.index === 1) { return 1 }
        else if (props.index === 2 || props.index === 3) { return 0.75 }
        else if (props.index === 4 || props.index === 5) { return 0.5 }
        else if (props.index === 6 || props.index === 7) { return 0.25 }
        else if (props.index === 8 || props.index === 9) { return 0 }
    }};
filter: ${props => props.index > 1 ? "blur(" + props.index * 1 + "px)" : "blur(0)"};
animation-duration:5s;
animation-fill-mode: forwards;
`



export default i07Walk;
