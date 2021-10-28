/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useCallback } from "react";
import Header from "../components/Header";
import HandStatus from "../components/HandStatus";
// import ButtonItem from "../components/ButtonItem";
import Stamp from '../components/Stamp'
import InteractionNav from '../components/InteractionNav'
import Placeholder from '../components/Placeholder'


import styled from "styled-components";

const i05Stamp = () => {
    const [cursorX, setCursorX] = React.useState(null);
    const [cursorY, setCursorY] = React.useState(null);
    const [clicked1, setClicked1] = React.useState(null);
    const [clicked2, setClicked2] = React.useState(null);
    const [clickInfo, setClickInfo] = React.useState([])
    const [btnCollect, setBtnCollect] = React.useState([{}]);
    const [hovered, setHovered] = React.useState(null); //which one is hovered?
    const [handInfo, setHandInfo] = React.useState([])
    const [drawIndex, setDrawIndex] = React.useState(0)

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
            {drawIndex === 0 ? <Placeholder content="Index finger tap to stamp anywhere"></Placeholder> : null}

            <Stamp cX={cursorX} cY={cursorY} click={clicked1} stampCallback={(value) => {
                setDrawIndex(value)
            }}></Stamp>

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
                    setHandInfo(value);
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
  top: 40vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  z-index: -2;
`;




export default i05Stamp;
