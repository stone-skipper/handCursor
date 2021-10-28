import * as React from "react"
import styled from "styled-components"

export default function Button(props) {
  const { x, y, w, h, color, buttonName, hovered, id } = props


  return (
    <ButtonStyle id={id} w={w} h={h} x={x} y={y} color={color} hovered={hovered}>
      {buttonName}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.div`
  position: absolute;
  width: ${(props) => props.w + "px"};
  height: ${(props) => props.h + "px"};
  top: ${(props) => props.y + "px"};
  left: ${(props) => props.x + "px"};
  background-color: ${(props) => (props.hovered ? "green" : "red")};
  transform: ${(props) => (props.hovered ? "scale(1.2)" : "scale(1)")};
  z-index: 11;
`
