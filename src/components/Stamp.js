import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
// import { Particle } from "./Particle"
import { useInterval } from "./utils"


const Stamp = (props) => {
    const { cX, cY, click, stampCallback } = props;
    var w = window.innerWidth;
    var h = window.innerHeight;
    const [stampArray, setStampArray] = React.useState([])
    const heatmapRef = React.useRef(null)
    const stampItems = ["🖐", "→", "🤘", "☺", "👍", "★", "👎", "✦", "✊", "☹", "👌", "☻", "👆", "✺",]

    const sendBtnData = (value) => {
        stampCallback(value);
    };

    React.useEffect(() => {
        sendBtnData(stampArray.length);
    }, [stampArray]);

    // useInterval(() => {
    //     if (cX !== null && cY !== "0" && cX !== undefined && cX !== w.toString() && cY !== null && heatArray.length < 20) {
    //         setHeatArray((prev) => [...prev, { x: cX, y: cY }])
    //     } else if (cX !== null && cY !== "0" && cX !== undefined && cX !== w.toString() && cY !== null && heatArray.length >= 20) {
    //         heatArray.slice(1, heatArray.length - 1);
    //         setHeatArray((prev) => [...prev, { x: cX, y: cY }])
    //     }
    //     // console.log(heatArray.length, heatArray[heatArray.length - 1])

    // }, 1000)

    React.useEffect(() => {
        if (click === true) {
            setStampArray((prev) => [...prev, { x: cX, y: cY, r: Math.floor(Math.random() * 360) + 1 }])
        }
    }, [click])

    React.useEffect(() => {

        // console.log(stampArray.length, stampArray[stampArray.length - 1])
        console.log(stampArray[stampArray.length - 1])
    }, [stampArray])


    return (
        <StampWrapper
            cX={cX} cY={cY}
        >

            {stampArray.filter(v => v.x !== null && v.x !== w && v.y !== 0).map((value, index) => {
                return (
                    <StampItem key={index} centerX={value.x} centerY={value.y} rotate={value.r}>{stampItems[index % stampItems.length]}</StampItem>
                )


            })}
            <canvas id="heatmap" ref={heatmapRef}>
            </canvas>
        </StampWrapper>
    );
};

const StampWrapper = styled.div`
width:100vw;
height:100vh;
position:fixed;
z-index:-2;
color:white;
font-size:2em;
`;


const StampItem = styled.div`
width:300px;
height:300px;
border-radius:150px;
// background-color: blue;
position:absolute;
left: ${props => props.centerX + "px"};
top: ${props => props.centerY + "px"};
z-index:-1;
transform: translate(-50%, -50%) ${props => "rotate(" + props.rotate + "deg)"};
// filter:blur(50px);
font-size:7em;
color:#0016FF;
`;


export default Stamp;
