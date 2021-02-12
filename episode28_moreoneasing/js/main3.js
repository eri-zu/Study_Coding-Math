"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

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

  norm(value, min, max) {
    return (value - min) / (max - min);
  }

  // 値の線形補間
  lerp(norm, min, max) {
    return (max - min) * norm + min;
  }

  // -100から100の範囲で変化する値を0から1の範囲で変化する値に変換する
  // hoge = map(50, 0, 1, -100, 100)
  // hogeは50から0.btn75に変換される
  map(value, toMin, toMax, fromMin, fromMax) {
    return this.lerp(this.norm(value, toMin, toMax), fromMin, fromMax);
  }
}

// new
const utils = new Utils();

// set up
const wheel = document.createElement("img");
wheel.src = "img/wheel.png";
const ease = 0.05;
let targetAngle = 0;
let angle = 0;

document.body.addEventListener("mousemove", (e) => {
  targetAngle = utils.map(e.clientX, 0, width, -Math.PI, Math.PI);
});

update();

function update() {
  context.clearRect(0, 0, width, height);

  angle += (targetAngle - angle) * ease;

  context.save();
  context.translate(width / 2, height / 2);
  context.rotate(angle);

  context.drawImage(wheel, -wheel.width / 2, -wheel.height / 2); // ctx.drawImage(image, dx, dy);

  context.restore();
  window.requestAnimationFrame(update);
}
