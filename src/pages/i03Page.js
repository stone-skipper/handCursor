/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from "react";

import styled from "styled-components";
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


import Header from "../components/Header";
import HandStatus from "../components/HandStatus";
import InteractionNav from '../components/InteractionNav'
import Placeholder from '../components/Placeholder'


const i03Page = () => {
  var [pNum, setPnum] = React.useState(3);
  const [cursorX, setCursorX] = React.useState(null);
  const [cursorY, setCursorY] = React.useState(null);
  const [clicked1, setClicked1] = React.useState(null);
  const [clicked2, setClicked2] = React.useState(null);
  const [handInfo, setHandInfo] = React.useState([])
  const [firsttap, setFirsttap] = React.useState(false)

  const getHandInfo = (childData) => {
    setCursorX(childData.x);
    setCursorY(childData.y);
    setClicked1(childData.indexTap);
    setClicked2(childData.middleTap);
  };

  React.useEffect(() => {
    console.log(clicked1, clicked2);
    if (clicked1 === true) {
      setFirsttap(true)
      if (pNum === 0) {
        setPnum(8);
      } else {
        setPnum(pNum - 1);
      }
    } else if (clicked2 === true) {
      setPnum(pNum + 1);
      if (pNum === 8) {
        setPnum(0)
      }
    }
  }, [clicked1, clicked2]);


  const slideStyle = {
    background: "red", width: "45vw", marginRight: "0.5vw", marginLeft: "0.5vw", height: "45vh", overflow: "hidden"
  }

  const active = () => {
  }

  return (
    <div className="App">

      {/* <p
        style={{
          color: "black",
          fontSize: "50px",
          position: "absolute",
          top: 200,
          left: 400,
          zIndex: 30
        }}
      >
        {cursorX}, {cursorY}
        <br></br>
        {pNum}
      </p> */}
      <Header></Header>
      <InteractionNav handData={handInfo}></InteractionNav>

      {/* <CarouselWrapper >
        <CarouselProvider
          naturalSlideWidth={150}
          naturalSlideHeight={125}
          totalSlides={9}
          visibleSlides={3}
          infinite
          orientation="horizontal"
          isIntrinsicHeight={true}
          currentSlide={pNum}
        // playDirection="forward"
        >
          <Slider >
            <Slide index={0} style={slideStyle}><img src={require('../img/01.jpeg')} classNameAnimation="anim" onFocus={active()} /></Slide>
            <Slide index={1} style={slideStyle}><img src={require('../img/02.jpeg')} classNameAnimation="anim" onFocus={active()} /></Slide>
            <Slide index={2} style={slideStyle}><img src={require('../img/03.png')} classNameAnimation="anim" onFocus={active()} /></Slide>
            <Slide index={3} style={slideStyle}><img src={require('../img/04.jpeg')} classNameAnimation="anim" onFocus={active()} /></Slide>
            <Slide index={4} style={slideStyle}><img src={require('../img/05.jpeg')} classNameAnimation="anim" onFocus={active()} /></Slide>
            <Slide index={5} style={slideStyle}><img src={require('../img/06.jpeg')} classNameAnimation="anim" onFocus={active()} /></Slide>
            <Slide index={6} style={slideStyle}><img src={require('../img/07.jpeg')} classNameAnimation="anim" onFocus={active()} /></Slide>
            <Slide index={7} style={slideStyle}><img src={require('../img/08.jpeg')} classNameAnimation="anim" onFocus={active()} /></Slide>
            <Slide index={8} style={slideStyle}><img src={require('../img/09.jpeg')} classNameAnimation="anim" onFocus={active()} /></Slide>
          </Slider>
        </CarouselProvider>
      </CarouselWrapper> */}
      <CarouselWrapper>
        <Carousel infiniteLoop={true} showIndicators={true} showThumbs={false} showArrows={false} showStatus={true} selectedItem={pNum} centerSlidePercentage={60} centerMode={true} transitionTime={1000} dynamicHeight={true} width="96vw">
          <Page><img src={require('../img/01.jpeg')} /></Page>
          <Page><img src={require('../img/02.jpeg')} /></Page>
          <Page><img src={require('../img/03.png')} /></Page>
          <Page><img src={require('../img/04.jpeg')} /></Page>
          <Page><img src={require('../img/05.jpeg')} /></Page>
          <Page><img src={require('../img/06.jpeg')} /></Page>
          <Page><img src={require('../img/07.jpeg')} /></Page>
          <Page><img src={require('../img/08.jpeg')} /></Page>
          <Page><img src={require('../img/09.jpeg')} /></Page>

        </Carousel>
      </CarouselWrapper>
      <HandStatus
        interactionType="pageTurner"
        detectOnStart={true}
        popup={true}
        parentCallback={(value) => {
          getHandInfo(value);
          setHandInfo(value)
        }}
      ></HandStatus>
      {firsttap === false ? <Placeholder content="Index finger tap for prev slide, middle finger tap for next slide"></Placeholder> : null}

    </div>
  );
};

const CarouselWrapper = styled.div`
width:96vw;
height:70vh;
position:absolute;
top:40vh;
left:2vw;
z-index:-2;

// .carousel__slider{
//   padding-left:1vw;
//   padding-right:1vw;
// }
background:white;

`

const Page = styled.div`
width: 60vw;
height: 40vh;
padding-left:1vw;
padding-right:1vw;
background:white;
color:white;
text-align:center;
font-size:2em;
overflow:hidden;
img{
  width:100%;
  height: 100%;
  object-fit: cover;
}
li{
  background:#0016FF;
}
`

export default i03Page;
