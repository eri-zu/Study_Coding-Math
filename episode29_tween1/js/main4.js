"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
let points = [];
let point = {
  x: 0,
  y: 0
}
const num = 30;
let target = {
  // 目標到達地点
  x: 0,
  y: 0,
};
const ease = 0.1;
let easing = true;

// for (let i = 0; i < num; i++) {
//   points.push(point);
// }

for (var i = 0; i < num; i++) {
  points.push({
    x: 0,
    y: 0,
  });
}

document.body.addEventListener("mousemove", (e) => {
  target.x = e.clientX;
  target.y = e.clientY;

});

update();

function update() {
  context.clearRect(0, 0, width, height);

  // 追従されるボール
  // targetは一つ前のボールのポジション
  let leader = {
    x: target.x,
    y: target.y,
  };

  for (let i = 0; i < num; i++) {
    points[i].x += (leader.x - points[i].x) * ease;
    points[i].y += (leader.y - points[i].y) * ease;

    context.beginPath();
    context.arc(points[i].x, points[i].y, 10, 0, Math.PI * 2, false);
    context.fill();

    leader.x = points[i].x;
    leader.y = points[i].y;
  }

  console.log(points)

  window.requestAnimationFrame(update);

}


// --------------------
// utility
// --------------------

class Utils {
  constructor() {}

  randomRange(min, max) {
    // randomRange(5, 10)とすると、5~10の範囲が得られる
    return min + Math.random() * (max - min);
  }

  quadraticBezier(p0, p1, p2, t, pFinal) {
    // 2次曲線
    // Math.pow(7, 3)
    pFinal = pFinal || {};
    pFinal.x =
      Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
    pFinal.y =
      Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;
    return pFinal;
  }

  cubicBezier(p0, p1, p2, p3, t, pFinal) {
    // 3次曲線
    pFinal = pFinal || {};
    pFinal.x =
      Math.pow(1 - t, 3) * p0.x +
      Math.pow(1 - t, 2) * 3 * t * p1.x +
      (1 - t) * 3 * t * t * p2.x +
      t * t * t * p3.x;
    pFinal.y =
      Math.pow(1 - t, 3) * p0.y +
      Math.pow(1 - t, 2) * 3 * t * p1.y +
      (1 - t) * 3 * t * t * p2.y +
      t * t * t * p3.y;
    return pFinal;
  }
}
