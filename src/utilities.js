//import React from "react"

//Drawing function
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  index: [0, 5, 6, 7, 8],
  //middle: [0, 9, 10, 11, 12],
  //ring: [0, 13, 14, 15, 16],
  //pinky: [0, 17, 18, 19, 20],
}

//mark unique point
const style = {
  0: { color: "darkgrey", size: 5 },
  1: { color: "darkgrey", size: 5 },
  2: { color: "darkgrey", size: 5 },
  3: { color: "darkgrey", size: 5 },
  4: { color: "darkgrey", size: 5 },
  5: { color: "darkgrey", size: 5 },
  6: { color: "darkgrey", size: 5 },
  7: { color: "darkgrey", size: 5 },
  8: { color: "darkgrey", size: 5 },
  9: { color: "darkgrey", size: 5 },
  10: { color: "darkgrey", size: 5 },
  11: { color: "darkgrey", size: 5 },
  12: { color: "darkgrey", size: 5 },
  13: { color: "darkgrey", size: 5 },
  14: { color: "darkgrey", size: 5 },
  15: { color: "darkgrey", size: 5 },
  16: { color: "darkgrey", size: 5 },
  17: { color: "darkgrey", size: 5 },
  18: { color: "darkgrey", size: 5 },
  19: { color: "darkgrey", size: 5 },
  20: { color: "darkgrey", size: 5 },
  21: { color: "rgba(255,255,255,0.5)", size: 10 },
}
var inDistance
var pos = {
  x: null,
  y: null,
}
var indexPointX, indexPointY, thumbPointX, thumbPointY, midPointX, midPointY
var cursorInfo = []
function DrawHand(predictions, ctx) {
  //{predictions, ctx} = props
  // const predictions = props.predictions
  // const ctx = props.ctx
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks
      const landmarksCrop = landmarks.slice(undefined, 9)

      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j]
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstIndex = fingerJoints[finger][k]
          const secondIndex = fingerJoints[finger][k + 1]
          ctx.beginPath()
          ctx.moveTo(
            //x, y value of the first dot
            landmarksCrop[firstIndex][0],
            landmarksCrop[firstIndex][1]
          )
          ctx.lineTo(
            landmarksCrop[secondIndex][0],
            landmarksCrop[secondIndex][1]
          )
          ctx.strokeStyle = "darkgrey"
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      for (let i = 0; i < landmarksCrop.length; i++) {
        const x = landmarksCrop[i][0]
        const y = landmarksCrop[i][1]
        const z = landmarksCrop[i][2]
        //drawing
        ctx.beginPath()
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI)
        //line
        ctx.fillStyle = style[i]["color"]
        ctx.fill()
      }
      var indexPointX = landmarksCrop[4][0]
      var indexPointY = landmarksCrop[4][1]

      var thumbPointX = landmarksCrop[8][0]
      var thumbPointY = landmarksCrop[8][1]

      var midPointX = (indexPointX + thumbPointX) / 2
      var midPointY = (indexPointY + thumbPointY) / 2
      pos = { x: midPointX.toFixed(0), y: midPointY.toFixed(0) }

      ctx.beginPath()
      ctx.arc(midPointX, midPointY, style[21]["size"], 0, 2 * Math.PI)
      ctx.fillStyle = style[21]["color"]
      ctx.fill()

      var distance = Math.sqrt(
        Math.pow(indexPointX - thumbPointX, 2) +
          Math.pow(indexPointY - thumbPointY, 2)
      )
      if (distance && distance < 50) {
        inDistance = true
        style[4].color = "white"
        style[8].color = "white"
        style[21].color = "rgba(255,255,255,1)"
        style[21].size = 20
        // console.log("isDistance:" + inDistance)
      } else if (distance && distance >= 50) {
        inDistance = false
        style[4].color = "darkgrey"
        style[8].color = "darkgrey"
        style[21].color = "rgba(255,255,255,0.5)"
        style[21].size = 10
        // console.log("isDistance:" + inDistance)
      }
    })
  }
  cursorInfo = [inDistance, pos]
  // console.log(cursorInfo)

  return cursorInfo
}

export default DrawHand
