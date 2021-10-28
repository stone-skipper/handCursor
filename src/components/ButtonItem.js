import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonItem = (props) => {

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
    props.hovering === props.id ? props.color : props.defaultColor};

  // color: ${(props) => props.textColor};
  display: flex;
  border:${(props) =>
    props.hovering === props.id ? "0px solid grey" : "1px solid " + props.borderColor};
 // border-radius:10px;
  font-style:italic;
  text-align: center;
  opacity:${props => props.active ? 1 : 0.3};
  // opacity: ${(props) => props.clicked ? 1 : 0.3};
  cursor: pointer;
//transform: ${(props) =>
    props.hovering === props.id ? "scale(1.05)" : "scale(1.0)"};

    h1{
      justify-items:center;
      width:100%;
      color: ${(props) =>
    props.hovering === props.id ? "white" : props.textColor};
    }
  span {
font-style:normal;
font-size:2em;
}



`;

export default ButtonItem;
