"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Utils {
  constructor() {}

  randomRange(min, max) {
    // randomRange(5, 10)とすると、5~10の範囲が得られる
    return min + Math.random() * (max - min);
  }

  quadraticBezier(p0, p1, p2, t, pFinal) {
    // 2次曲線（コントロールポイント1）
    // Math.pow(7, 3)
    pFinal = pFinal || {};
    pFinal.x =
      Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
    pFinal.y =
      Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;
    return pFinal;
  }

  cubicBezier(p0, p1, p2, p3, t, pFinal) {
    // 3次曲線（コントロールポイント2）
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

  multicurves(points, context) {
    // quadraticBezierがつながったもの
    let p0, p1, midx, midy;
    context.moveTo(points[0].x, points[0].y); // first endpoint

    for (var i = 1; i < points.length - 2; i++) {
      //index1 がfirst controll point , 最後から2つ目が最後のcontroll point
      //2つの隣り合ったコントロールポイント
      p0 = points[i];
      p1 = points[i + 1];
      // コントロールポイントの真ん中のポイント
      midx = (p0.x + p1.x) / 2;
      midy = (p0.y + p1.y) / 2;
      // 最初のコントロールポイントとmidポイントをとおるベジェ曲線を描く
      context.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }

    // 最後のコントロールポイントはループに入れなくてok

    p0 = points[points.length - 2]; // 最後から2つ目のコントロールポイント
    p1 = points[points.length - 1]; // 最後のコントロールポイント
    context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
  }
}

// new
const utils = new Utils();

// var
let points = [];
const numPoints = 10;

// ポイント作成して配列作成
for (let i = 0; i < numPoints; i++) {
  const p = {
    x: utils.randomRange(0, width),
    y: utils.randomRange(0, height),
  };

  context.beginPath();
  context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
  context.fill();

  points.push(p);
}

// ベジェ曲線描画
context.beginPath();
utils.multicurves(points, context);
context.stroke();


