import React, { useRef } from "react";

import ButtonItem from '../components/ButtonItem'
// import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

const items = [
    { name: "hover", link: "/01", active: true },
    { name: "click", link: "/02", active: true },
    { name: "page", link: "/03", active: true },
    { name: "draw", link: "/04", active: true },
    { name: "stamp", link: "/05", active: true },
    { name: "weave", link: "/06", active: true },
    { name: "walk", link: "/07", active: true },
    { name: "3d touch", link: "/interactions", active: false },
]

const currentPage = window.location.href

const InteractionNav = (props) => {
    const { handData } = props
    const [cursorX, setCursorX] = React.useState(null);
    const [cursorY, setCursorY] = React.useState(null);
    const [clicked1, setClicked1] = React.useState(null);
    const [clicked2, setClicked2] = React.useState(null);
    const [clickInfo, setClickInfo] = React.useState([])
    const [btnCollect, setBtnCollect] = React.useState([{}]);
    const [hovered, setHovered] = React.useState(null); //which one is hovered?


    // console.log(window.location.href)

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

    React.useEffect(() => {
        getHandInfo(handData)
    }, [handData])

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


    return (<NavWrapper>
        {items.map((value, index) => {
            return (
                <ButtonItem key={index} id={index} width="calc((96vw / 8) - (1px * 7))" height="5vh" color="#0016FF" textColor="#0016FF" content={<h1>{value.name}{value.link === "/" + currentPage.slice(-2).toString() ? <p>✓</p> : null}</h1>} link={value.link} btnCallback={(value) => {
                    getBtnInfo(value);
                }} hovering={hovered} clicked={clickInfo[index]} defaultColor="transparent" borderColor="#0016FF" active={value.active} currentPage={currentPage}>
                </ButtonItem>
            )
        })}
    </NavWrapper>)
}

const NavWrapper = styled.div`
width: 96vw;
height: 5vh;
position: absolute;
display:grid;
grid-template-columns:repeat(8, 1fr);
grid-gap-column:8px;
justify-items:center;
top:20vh;
left:2vw;
font-family: 'Montserrat', sans-serif;


p{
    font-size: 2em;
    text-align:center;
    margin: 0 auto;
    opacity: 0.6;
    width: calc((96vw / 8) - (1px * 7));
    height: 5vh;
    transform: translateY(-110%);
    font-family: 'Montserrat', sans-serif;
}

`

export default InteractionNav;
