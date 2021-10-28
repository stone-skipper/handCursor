import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = (props) => {

    const {
        id,
        width,
        height,
        color,
        textColor,
        content,
        link,
        btnCallback,
        hovering,
        clicked,
        defaultColor,
        borderColor,
        active,
    } = props;

    var [bTop, setbTop] = React.useState(null);
    var [bLeft, setbLeft] = React.useState(null);
    var [bWidth, setbWidth] = React.useState(null);
    var [bHeight, setbHeight] = React.useState(null);

    const sendBtnData = (value) => {
        btnCallback(value);
    };

    React.useEffect(() => {
        sendBtnData({
            id: id,
            top: bTop,
            left: bLeft,
            width: bWidth,
            height: bHeight,
        });
    }, [bTop]);

    React.useEffect(() => {
        if (link !== "" && clicked === true && active == true) {
            // return (<Redirect to={link} />
            // )
            window.location = link
        }

    }, [clicked])

    return (
        <Button
            id={id}
            width={width}
            height={height}
            color={color}
            content={content}
            link={link}
            hovering={hovering}
            textColor={textColor}
            clicked={clicked}
            defaultColor={defaultColor !== undefined ? defaultColor : "grey"}
            borderColor={borderColor !== undefined ? borderColor : "transparent"}
            active={active}
            ref={(el) => {
                if (!el) return;
                setbTop(el.getBoundingClientRect().top);
                setbLeft(el.getBoundingClientRect().left);
                setbWidth(el.getBoundingClientRect().width);
                setbHeight(el.getBoundingClientRect().height);
            }}
        >
            {content}
            <Link to={link}>
                {/* <span style={{ display: "block", width: "100%", height: "100%" }}>
          <br />
          {bTop} <br />
          {bLeft} <br />
          {bWidth} <br />
          {bHeight} <br />
        </span> */}
            </Link>


        </Button>
    );
};

const Button = styled.div`
font-size:0.5em;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
        props.clicked ? props.color : props.defaultColor};
    // color: ${(props) => props.textColor};
  display: flex;
  border-radius:10px;
  border:${(props) =>
        props.hovering === props.id ? "1px solid " + props.borderColor : "0px solid " + props.borderColor};
 // border-radius:10px;
  text-align: center;
  cursor: pointer;
transform: ${(props) =>
        props.clicked ? "scaleX(-1)" : "scale(1)"};
transition:0.5s;
position:relative;

    h1{
        position:absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      width:100%;
      margin:0;
      font-size:12em;
      color: ${(props) =>
        props.clicked ? props.textColor : "rgba(255,255,255,0)"};
    }




`;

export default Card;
