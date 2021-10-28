/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from "react";
import ZoomHeader from "../components/ZoomHeader";
import Webcam from "react-webcam";

// import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
import styled from "styled-components";
import HandStatus from "../components/HandStatus";
import ButtonItem from '../components/ButtonItem'


const Zoom = () => {
    var [pNum, setPnum] = React.useState(0);
    const [cursorX, setCursorX] = React.useState(null);
    const [cursorY, setCursorY] = React.useState(null);
    const [clicked1, setClicked1] = React.useState(null);
    const [clicked2, setClicked2] = React.useState(null);
    const [clickInfo, setClickInfo] = React.useState([])
    const [btnCollect, setBtnCollect] = React.useState([{}]);
    const [hovered, setHovered] = React.useState(null); //which one is hovered?
    const [handInfo, setHandInfo] = React.useState([])
    var w = window.innerWidth;
    var h = window.innerHeight;
    const zoomButtons = [
        { name: "a", link: "/", active: true },
        { name: "a", link: "/", active: true },
        { name: "a", link: "/", active: true },
        { name: "a", link: "/", active: true },
        { name: "a", link: "/", active: true },

    ]


    const zoomWebcamRef = useRef(null);


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
        console.log(clicked1, clicked2);
        if (clicked1 === true) {
            if (pNum === 0) {
                setPnum(0);
            } else {
                setPnum(pNum - 1);
            }
        } else if (clicked2 === true) {
            setPnum(pNum + 1);
        }
    }, [clicked1, clicked2]);


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
                {cursorX}, {cursorY}
                <br></br>
                {pNum}
            </p> */}
            <ZoomHeader />
            <Body>

                <VideoWrapper>

                    <div style={{ width: "44vw", overflow: "hidden" }}> <img src={require("../img/call-sample.jpg")}></img></div>
                    <Webcam
                        mirrored={true}
                        ref={zoomWebcamRef}
                        videoConstraints={{ aspectRatio: w / h }}
                        style={{
                            // position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            // left: 0,
                            // right: 0,
                            // top: 0,
                            textAlign: "center",
                            width: "44vw",
                        }}
                    />
                </VideoWrapper>

                <ButtonWrapper>
                    {zoomButtons.map((value, index) => {
                        return (
                            <ButtonItem key={index} id={index} width="5vw" height="5vw" color="green" textColor="white" content={<h1>{value.name}</h1>} link={value.link} btnCallback={(value) => {
                                getBtnInfo(value);
                            }} hovering={hovered} clicked={clickInfo[index]} defaultColor="#0016FF" borderColor="#0016FF" active={value.active}>
                            </ButtonItem>
                        )
                    })}
                </ButtonWrapper>
                <div style={{ width: "100vw", height: "100vh", textAlign: "center", background: "#0016ff", color: "white", fontFamily: 'Montserrat', fontSize: "2em", position: "absolute", zIndex: 10000, top: 0, opacity: 0.8 }}><p style={{ margin: 0, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>This prototype is still in progress.</p></div>
            </Body>
            <HandStatus
                interactionType="pageTurner"
                detectOnStart={true}
                popup={true}
                parentCallback={(value) => {
                    getHandInfo(value);
                    setHandInfo(value);
                }}
            ></HandStatus>
        </div >
    );
};


const Body = styled.div`
width:100vw;
height:100vh;
position:absolute;
top:0;
left:0;
z-index:-4;
text-align:center;
img{
    width:49vw;
    // filter:blur(10px);
}
`

const VideoWrapper = styled.div`
width: 90vw;
margin-left:5vw;
display:grid;
grid-template-columns: 44vw 44vw;
grid-column-gap: 2vw;
position:absolute;
margin-top:20vh;
`

const ButtonWrapper = styled.div`
width: 45vw;
display:grid;
grid-template-columns:repeat(5, 1fr);
margin:0 auto;
margin-top:70vh;
align-items:center;
justify-items:center;
`

export default Zoom;
