import React, { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

const HoverItem = (props) => {
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
    } = props;

    //   var bTop, bLeft, bWidth, bHeight;
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

    return (
        <Hover
            id={id}
            width={width}
            height={height}
            color={color}
            content={content}
            link={link}
            hovering={hovering}
            textColor={textColor}
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
                <span style={{ display: "block", width: "100%", height: "100%", display: "none" }}>
                    <br />
                    {bTop} <br />
                    {bLeft} <br />
                    {bWidth} <br />
                    {bHeight} <br />
                </span>
            </Link>
        </Hover>
    );
};

const hoverAnim = keyframes`
0%{opacity:0;}
100%{opacity:1;}
`

const Hover = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.color};
color: ${(props) => props.textColor};
display: inline - block;
text - align: center;
cursor: pointer;

opacity:${(props) => {
        if (props.hovering === props.id) {
            return 1
        } else if (props.hovering === props.id - 1 || props.hovering === props.id + 1) {
            return 0.9
        } else if (props.hovering === props.id - 2 || props.hovering === props.id + 2) {
            return 0.8
        } else if (props.hovering === props.id - 3 || props.hovering === props.id + 3) {
            return 0.7
        } else if (props.hovering === props.id - 4 || props.hovering === props.id + 4) {
            return 0.6
        } else if (props.hovering === props.id - 5 || props.hovering === props.id + 5) {
            return 0.5
        } else if (props.hovering === props.id - 6 || props.hovering === props.id + 6) {
            return 0.4
        } else if (props.hovering === props.id - 7 || props.hovering === props.id + 7) {
            return 0.3
        } else if (props.hovering === props.id - 8 || props.hovering === props.id + 8) {
            return 0.2
        } else if (props.hovering === props.id - 9 || props.hovering === props.id + 9) {
            return 0.1
        } else {
            return 0
        }
    }};

span {
    color: white;
}
`;


export default HoverItem;
