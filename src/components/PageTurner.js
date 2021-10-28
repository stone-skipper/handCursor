//Drawing function
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  index: [0, 5, 6, 7, 8],
  middle: [0, 9, 10, 11, 12],
  ring: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

//mark unique point
const style = {
  0: { color: "lightgrey", size: 3 },
  1: { color: "lightgrey", size: 3 },
  2: { color: "lightgrey", size: 3 },
  3: { color: "lightgrey", size: 3 },
  4: { color: "lightgrey", size: 3 },
  5: { color: "lightgrey", size: 3 },
  6: { color: "lightgrey", size: 3 },
  7: { color: "lightgrey", size: 3 },
  8: { color: "lightgrey", size: 3 },
  9: { color: "lightgrey", size: 3 },
  10: { color: "lightgrey", size: 3 },
  11: { color: "lightgrey", size: 3 },
  12: { color: "lightgrey", size: 3 },
  13: { color: "lightgrey", size: 3 },
  14: { color: "lightgrey", size: 3 },
  15: { color: "lightgrey", size: 3 },
  16: { color: "lightgrey", size: 3 },
  17: { color: "lightgrey", size: 3 },
  18: { color: "lightgrey", size: 3 },
  19: { color: "lightgrey", size: 3 },
  20: { color: "lightgrey", size: 3 },
  21: { color: "rgba(255,255,255,0)", size: 0 },//indextap color
  22: { color: "rgba(255,255,255,0)", size: 0 },//middletap color
};
var thumbindexCheck;
var thumbmiddleCheck;
var pos = {
  x: null,
  y: null,
};

var cursorInfo = [];
function pageTurner(predictions, ctx, ctx2) {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;
      const landmarksCrop = landmarks.slice(undefined, 13);

      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];

        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstIndex = fingerJoints[finger][k];
          const secondIndex = fingerJoints[finger][k + 1];
          ctx.beginPath();
          ctx.moveTo(
            //x, y value of the first dot
            landmarks[firstIndex][0],
            landmarks[firstIndex][1]
          );
          ctx.lineTo(landmarks[secondIndex][0], landmarks[secondIndex][1]);
          ctx.strokeStyle = "lightgrey";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0].toFixed(0);
        const y = landmarks[i][1].toFixed(0);
        //    const z = landmarksCrop[i][2].toFixed(0);
        //drawing
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }

      var thumbPointX = landmarksCrop[4][0];
      var thumbPointY = landmarksCrop[4][1];
      // var thumbPointZ = landmarksCrop[4][2];

      var indexPointX = landmarksCrop[8][0];
      var indexPointY = landmarksCrop[8][1];
      // var indexPointZ = landmarksCrop[8][1];

      var middlePointX = landmarks[12][0];
      var middlePointY = landmarks[12][1];
      // var middlePointZ = landmarks[12][1];

      var thumbindexPointX = (indexPointX + thumbPointX) / 2;
      var thumbindexPointY = (indexPointY + thumbPointY) / 2;

      var thumbmiddlePointX = (middlePointX + thumbPointX) / 2;
      var thumbmiddlePointY = (middlePointY + thumbPointY) / 2;

      pos = { x: thumbindexPointX.toFixed(0), y: thumbindexPointY.toFixed(0) };

      const cp = [];
      cp[0] = { x: thumbindexPointX, y: thumbindexPointY };
      cp[1] = { x: thumbmiddlePointX, y: thumbmiddlePointY };

      // indexTap style
      ctx2.beginPath();
      ctx2.arc(cp[0]["x"], cp[0]["y"], style[21]["size"], 0, 2 * Math.PI)
      ctx2.fillStyle = style[21]["color"]
      ctx2.fill();

      // indexTap + cursor
      ctx2.beginPath();
      ctx2.font = "40px montserrat-light";
      ctx2.fillStyle = "lightgrey"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx2.fillText("+", cp[0]["x"] - 10, cp[0]["y"] + 10);

      // middleTap style
      ctx2.beginPath();
      ctx2.arc(cp[1]["x"], cp[1]["y"], style[22]["size"], 0, 2 * Math.PI)
      ctx2.strokeStyle = style[22]["color"]
      ctx2.lineWidth = 3
      ctx2.stroke()
      // for (let i = 21; i < 23; i++) {
      //   ctx2.beginPath();
      //   ctx2.arc(
      //     cp[i - 21]["x"],
      //     cp[i - 21]["y"],
      //     style[i]["size"],
      //     0,
      //     2 * Math.PI
      //   );
      //   ctx2.fillStyle = style[i]["color"];
      //   ctx2.fill();
      // }

      var thumbindex = Math.sqrt(
        Math.pow(indexPointX - thumbPointX, 2) +
        Math.pow(indexPointY - thumbPointY, 2)
      );

      // var thumbindexZ = (indexPointZ + thumbPointZ) / 2;

      var thumbmiddle = Math.sqrt(
        Math.pow(middlePointX - thumbPointX, 2) +
        Math.pow(middlePointY - thumbPointY, 2)
      );

      // var thumbmiddleZ = (thumbPointZ + middlePointZ) / 2;

      if (thumbindex && thumbindex < 60) {
        // when thumb and index meet
        thumbindexCheck = true;
        style[4].color = "lightgrey";
        style[8].color = "lightgrey";
        style[21].color = "rgba(0, 22, 255, 0.2)";
        style[21].size += 3;
        if (style[21].size >= 20) {
          style[21].size = 20;
        }
        style[22].size = 0;
        // console.log("index tap");
      } else if (thumbmiddle && thumbmiddle < 60) {
        // when thumb and middle meet
        thumbmiddleCheck = true;
        style[4].color = "lightgrey";
        style[12].color = "lightgrey";
        style[22].color = "rgba(0, 22, 255, 0.2)";
        style[21].size = 0;
        style[22].size += 3;
        if (style[22].size >= 20) {
          style[22].size = 20;
        }
        // console.log("middle tap");
      } else if (thumbmiddle >= 60 || thumbindexCheck >= 60) {
        // when no fingers meet
        thumbmiddleCheck = false;
        thumbindexCheck = false;
        style[4].color = "lightgrey";
        style[8].color = "lightgrey";
        style[12].color = "lightgrey";
        style[21].color = "rgba(255,255,255,0)"
        style[21].size = 15;
        style[22].size = 0;

        // console.log("no tap");
      }
    });
  }
  cursorInfo = [thumbindexCheck, thumbmiddleCheck, pos];

  return cursorInfo;
}

export default pageTurner;
