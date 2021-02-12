"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let start = { // 開始位置
  x: 100,
  y: 100,
};
let target = {};  // 目標値
let change = {}; // 変化量
let startTime; //開始時間
const duration = 1000; //アニメーションする時間

drawCircle(start.x, start.y);

document.body.addEventListener("click", function (event) {
  target.x = event.clientX;
  target.y = event.clientY;
  change.x = target.x - start.x;
  change.y = target.y - start.y;
  startTime = new Date();
  update();
});

function update() {
  context.clearRect(0, 0, width, height);

  let time = new Date() - startTime; // 経過時間

  // アニメーションする時間内であれば
  if (time < duration) {
    // t: current time, b: beginning value, c: change in value, d: duration
    const x = easeInOutQuad(time, start.x, change.x, duration);
    const y = easeInOutQuad(time, start.y, change.y, duration);

    drawCircle(x, y);

    window.requestAnimationFrame(update);

  } else {
    // アニメーションする時間超えたら目標値と同等にしてアップデートやめる
    drawCircle(target.x, target.y);
    start.x = target.x;
    start.y = target.y;
  }
}

function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, 20, 0, Math.PI * 2, false);
  context.fill();
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

///////////// QUADRATIC EASING: t^2 ///////////////////

// quadratic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be in frames or seconds/milliseconds
function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}

// quadratic easing out - decelerating to zero velocity
function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

// quadratic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}
