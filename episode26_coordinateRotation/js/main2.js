"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d"); // 弾丸を描写
const targetCanvas = document.getElementById("target");
const targetContext = targetCanvas.getContext("2d"); // ヒットされるオブジェクトの描画領域
const width = (canvas.width = targetCanvas.width = window.innerWidth);
const height = (canvas.height = targetCanvas.height = window.innerHeight);
const fl = 300; // 視野角
const centerZ = 1500;
let points = [];
let needsUpdate = true;

// 画面の中心を(0, 0)とする
context.translate(width / 2, height / 2);

// 立方体の頂点
points[0] = { x: -500, y: -500, z: 500 };
points[1] = { x: 500, y: -500, z: 500 };
points[2] = { x: 500, y: -500, z: -500 };
points[3] = { x: -500, y: -500, z: -500 };
points[4] = { x: -500, y: 500, z: 500 };
points[5] = { x: 500, y: 500, z: 500 };
points[6] = { x: 500, y: 500, z: -500 };
points[7] = { x: -500, y: 500, z: -500 };

// 3Dpointsを2D空間に映し出すためにscreenx, screeny positionを作る
function project() {
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const scale = fl / (fl + p.z + centerZ);

    p.sx = p.x * scale; // 全ての頂点にscale（perspective）をかける
    p.sy = p.y * scale;
  }
}

// 頂点を線で結ぶ
function drawLine() {
  let p = points[arguments[0]]; //arguments[0]で関数に渡された１番目の引数を返す
  context.moveTo(p.sx, p.sy);

  for (var i = 1; i < arguments.length; i++) {
    p = points[arguments[i]];
    context.lineTo(p.sx, p.sy);
  }
}

// 静的な立方体を移動させる
function translateModel(x, y, z) {
  for (let i = 0; i < points.length; i++) {
    points[i].x += x;
    points[i].y += y;
    points[i].z += z;
  }

  needsUpdate = true; // keyを押してる間だけtrueになる
}

// 座標軸を回転させる
function rotateX(angle) {
  var cos = Math.cos(angle),
    sin = Math.sin(angle);

  for (var i = 0; i < points.length; i++) {
    var p = points[i],
      y = p.y * cos - p.z * sin,
      z = p.z * cos + p.y * sin;
    p.y = y;
    p.z = z;
  }
  needsUpdate = true;
}

function rotateY(angle) {
  var cos = Math.cos(angle),
    sin = Math.sin(angle);

  for (var i = 0; i < points.length; i++) {
    var p = points[i],
      x = p.x * cos - p.z * sin,
      z = p.z * cos + p.x * sin;
    p.x = x;
    p.z = z;
  }
  needsUpdate = true;
}

function rotateZ(angle) {
  var cos = Math.cos(angle),
    sin = Math.sin(angle);

  for (var i = 0; i < points.length; i++) {
    var p = points[i],
      x = p.x * cos - p.y * sin,
      y = p.y * cos + p.x * sin;
    p.x = x;
    p.y = y;
  }
  needsUpdate = true;
}

document.body.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37: // left
      if (event.ctrlKey) {
        rotateY(0.05);
      } else {
        translateModel(-20, 0, 0);
      }
      break;
    case 39: // right
      if (event.ctrlKey) {
        rotateY(-0.05);
      } else {
        translateModel(20, 0, 0);
      }
      break;
    case 38: // top
      if (event.shiftKey) {
        translateModel(0, 0, 20);
      } else if (event.ctrlKey) {
        rotateX(0.05);
      } else {
        translateModel(0, -20, 0);
      }
      break;
    case 40: // down
      if (event.shiftKey) {
        translateModel(0, 0, -20);
      } else if (event.ctrlKey) {
        rotateX(-0.05);
      } else {
        translateModel(0, 20, 0);
      }
      break;
  }
});

update();

function update() {
  if (needsUpdate) {
    context.clearRect(-width / 2, -height / 2, width, height);
    project();

    context.beginPath();
    drawLine(0, 1, 2, 3, 0); // 上面をぐるっと一周（数字は各頂点の番号）
    drawLine(4, 5, 6, 7, 4); // 下面をぐるっと一周
    drawLine(0, 4); // 縦線
    drawLine(1, 5);
    drawLine(2, 6);
    drawLine(3, 7);
    context.stroke();

    needsUpdate = false; // 移動が終わったらfalseになる
  }

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
