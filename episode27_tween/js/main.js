"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d"); // 弾丸を描写
const targetCanvas = document.getElementById("target");
const targetContext = targetCanvas.getContext("2d"); // ヒットされるオブジェクトの描画領域
const width = (canvas.width = targetCanvas.width = window.innerWidth);
const height = (canvas.height = targetCanvas.height = window.innerHeight);
const point = {
  x: 300, 
  y: 200
}
const angle = 0.05;

// 画面の中心を(0, 0)とする
context.translate(width / 2, height / 2);

update();

function update() {
  context.clearRect(-width / 2, -height / 2, width, height);
  
  context.beginPath();
  context.arc(point.x, point.y, 20, 0, Math.PI * 2, false);
  context.fill();

  let x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
  let y = point.y * Math.cos(angle) + point.x * Math.sin(angle);

  point.x = x;
  point.y = y;
  


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
