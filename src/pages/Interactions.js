import React, { useRef } from "react";

import Header from "../components/Header";
import HandStatus from "../components/HandStatus";
import styled from "styled-components";
// import ButtonItem from "../components/ButtonItem";
import InteractionNav from '../components/InteractionNav'
import Placeholder from '../components/Placeholder'
// import Heatmap from "../components/Heatmap"


function Interactions() {
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

            <BodyWrapper>
                <Header></Header>

            </BodyWrapper>
            <InteractionNav handData={handInfo}></InteractionNav>
            {/* <ItemWrapper>
                <ButtonItem
                    id={0}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/01"
                    hovering={hovered}
                    clicked={clickInfo[0]}
                    content={<h1><span>🖐</span><br />Hover</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={1}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/02"
                    hovering={hovered}
                    clicked={clickInfo[1]}
                    content={<h1><span>👌</span><br />Click</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={2}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/03"
                    hovering={hovered}
                    clicked={clickInfo[2]}
                    content={<h1><span>👉</span><br />Page</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={3}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/04"
                    hovering={hovered}
                    clicked={clickInfo[3]}
                    content={<h1><span>👩‍💻</span><br />Zoom</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={4}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/04"
                    hovering={hovered}
                    clicked={clickInfo[3]}
                    content={<h1><span>👩‍💻</span><br />Zoom</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={5}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/04"
                    hovering={hovered}
                    clicked={clickInfo[3]}
                    content={<h1><span>👩‍💻</span><br />Zoom</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={6}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/04"
                    hovering={hovered}
                    clicked={clickInfo[3]}
                    content={<h1><span>👩‍💻</span><br />Zoom</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={7}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/04"
                    hovering={hovered}
                    clicked={clickInfo[3]}
                    content={<h1><span>👩‍💻</span><br />Zoom</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={8}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/04"
                    hovering={hovered}
                    clicked={clickInfo[3]}
                    content={<h1><span>👩‍💻</span><br />Zoom</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
                <ButtonItem
                    id={9}
                    width="12vw"
                    height="12vw"
                    color="rgba(255,255,255,0.3)"
                    defaultColor="transparent"
                    textColor="white"
                    link="/04"
                    hovering={hovered}
                    clicked={clickInfo[3]}
                    content={<h1><span>👩‍💻</span><br />Zoom</h1>}
                    btnCallback={(value) => {
                        getBtnInfo(value);
                    }}
                ></ButtonItem>
            </ItemWrapper> */}
            <HandStatus
                interactionType=""
                detectOnStart={true}
                popup={false}
                parentCallback={(value) => {
                    getHandInfo(value);
                    setHandInfo(value)
                }}
                hovering={hovered}
            ></HandStatus>

            <Placeholder content="Two gestures are available - index finger and thumb, or middle finger and thumb."></Placeholder>
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


const ItemWrapper = styled.div`
  position: absolute;
  width: 40vw;
  right: 4vw;
top: 2vw;
  height: calc(100vh - 4vw);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  color: white;
  z-index: -5;
`;

export default Interactions;
