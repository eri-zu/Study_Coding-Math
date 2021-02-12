"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
let target = {
  // 目標到達地点
  x: width,
  y: height * Math.random(),
};
const position = {
  //現在のposition
  x: 0,
  y: height * Math.random(),
};
const ease = 0.1;
let easing = true;


document.body.addEventListener("mousemove", (e) => {
  target.x = e.clientX;
  target.y = e.clientY;

  // 一度falseになったものを、mousemoveして再びtrueにしてオブジェクトを動かす
  if(!easing) {
    easing = true;
    update();
  }
});

update();

function update() {
  context.clearRect(0, 0, width, height);

  context.beginPath();
  context.arc(position.x, position.y, 20, 0, Math.PI * 2, false);
  context.fill();

  easing = easeTo(position, target, ease);

  if(easing) {
    window.requestAnimationFrame(update);
  }
  
}

function easeTo(position, target, ease) {
  let dx = target.x - position.x;
  let dy = target.y - position.y;
  position.x += dx * ease;
  position.y += dy * ease;

  // target地点に十分に近づいたら、callするのを辞める（easingをfalseにする）
  if(Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
    position.x = target.x;
    position.y = target.y;
    console.log("stop");
    return false;
  } 

  return true;

  
  
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
