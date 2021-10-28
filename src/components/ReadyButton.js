import React, { useRef } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

const ReadyButton = (props) => {
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
        defaultColor
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
        if (link !== "" && clicked === true) {
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
            ref={(el) => {
                if (!el) return;
                setbTop(el.getBoundingClientRect().top);
                setbLeft(el.getBoundingClientRect().left);
                setbWidth(el.getBoundingClientRect().width);
                setbHeight(el.getBoundingClientRect().height);
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76">
                <path d="M 7 38 L 7 38 L 67.5 38" fill="transparent" stroke-width="4" stroke={textColor}></path>
                <path d="M 51 55 L 67.5 38 L 51 21" fill="transparent" stroke-width="4" stroke={textColor}></path>
            </svg>{content}
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
    font-family: 'Montserrat', sans-serif;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  //background-color: ${(props) =>
        props.hovering === props.id ? props.color : props.defaultColor};
  color: ${(props) => props.textColor};
  display: grid;
  grid-template-columns: 76px auto;
  grid-column-gap:20px;
  align-items: center;
  justify-items: start;
//border : 4px solid white;
    border-radius: ${(props) => "calc(" + props.height + " / 2)"};
  border:${(props) =>
        props.hovering === props.id ? "4px solid " + props.textColor : "0px solid " + props.textColor};
          
  opacity:1;
  // opacity: ${(props) => props.clicked ? 1 : 0.3};
  cursor: pointer;
transform: ${(props) =>
        props.hovering === props.id ? "scale(1.05)" : "scale(1.0)"};

h1{
    padding:0;
}
svg{
    margin: 0;
    padding:0;
    padding-left:${(props) =>
        props.hovering === props.id ? "10px" : 0};
}
`;

export default ReadyButton;
