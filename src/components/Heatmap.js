import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
// import { Particle } from "./Particle"
import { useInterval } from "./utils"


const Heatmap = (props) => {
    const _ = require("lodash");

    const { cX, cY } = props;
    var w = window.innerWidth;
    var h = window.innerHeight;
    const animDuration = "7s"
    const [heatArray, setHeatArray] = React.useState([])
    const [filteredArray, setFilteredArray] = React.useState([])
    const heatmapRef = React.useRef(null)
    // var filteredArray = []



    function addCursorInfo(value) {

        if (value.x !== null && cY !== "0" && cX !== undefined && cX !== w.toString() && cY !== null && heatArray.length < 150 && heatArray.includes(value) === false) {
            setHeatArray((prev) => [...prev, value])
        }
        else if (heatArray.length > 150) {
            setHeatArray([])
        }
    }

    useInterval(() => {

        addCursorInfo({ x: cX, y: cY })
        // if (cX !== null && cY !== "0" && cX !== undefined && cX !== w.toString() && cY !== null && heatArray.length < 150 && isInArray({ x: cX, y: cY }, heatArray) === false) {
        //     setHeatArray((prev) => [...prev, { x: cX, y: cY }]
        //     )
        // }

        // else if (cX !== null && cY !== "0" && cX !== undefined && cX !== w.toString() && cY !== null && heatArray.length >= 150) {
        //     // heatArray.slice(1, heatArray.length - 1);
        //     // setHeatArray((prev) => [...prev, { x: cX, y: cY }])
        //     setHeatArray([])
        // }
        // console.log(heatArray.length, heatArray[heatArray.length - 1])

    }, 500)



    React.useEffect(() => {
        var filter = _.map(
            _.uniq(
                _.map(heatArray, function (obj) {
                    return JSON.stringify(obj);
                })
            ), function (obj) {
                return JSON.parse(obj);
            }
        );
        // drawArray = [...new Set(heatArray)]
        // if (heatArray.length > 20) {
        //     heatArray.shift();
        // }
        // console.log(heatArray.length, heatArray)
        // console.log(drawArray)
        // const uniqueValues = new Set(values.map(v => v.name));
        setFilteredArray(filter)
        console.log(filteredArray)
    }, [heatArray])



    return (
        <HeatmapWrapper
            cX={cX} cY={cY}
        >

            {filteredArray.filter(v => v.x !== null && v.x !== w && v.y !== 0).map((value, index) => {
                if (filteredArray.length !== 0) {
                    return (
                        <HeatItem key={index} centerX={value.x} centerY={value.y} animDuration={animDuration}></HeatItem>
                    )
                }

            })}
            <canvas id="heatmap" ref={heatmapRef}>
            </canvas>
        </HeatmapWrapper>
    );
};

const HeatmapWrapper = styled.div`
width:100vw;
height:100vh;
position:fixed;
z-index:-20;
background:transparent;
color:white;
font-size:2em;
`;

const heatmapAnim = keyframes`
0% {opacity:0; transform:scale(0); background: #0016FF;}
50% {opacity:0.8; transform:scale(1); background: #0016FF;}
90% {opacity: 0.8; transform:scale(1); background:#0016FF;}
100% {opacity:0; transform:scale(0.8); background:#0016FF;}

`

const HeatItem = styled.div`
width:300px;
height:300px;
border-radius:150px;
background-color: cyan;
position:absolute;
opacity:0.2;
left: ${props => props.centerX + "px"};
top: ${props => props.centerY + "px"};
transform: translate(-50%, -50%);
filter:blur(50px);
animation-name: ${heatmapAnim};
animation-duration: ${props => props.animDuration};
// animation-timing-function: ease-in-out;  
animation-fill-mode: forwards;
`;


export default Heatmap;
