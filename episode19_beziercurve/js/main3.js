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

class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setX(value) {
    this.x = value;
  }

  getX() {
    return this.x;
  }

  setY(value) {
    this.y = value;
  }

  getY() {
    return this.y;
  }

  // 角度と速度
  setAngle(angle) {
    const length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setLength(length) {
    const angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // ベクトル同士の加減乗除して新しいベクトルを作る
  add(vector2) {
    return new Vector2d(this.x + vector2.getX(), this.y + vector2.getY());
  }
  subtract(vector2) {
    return new Vector2d(this.x - vector2.getX(), this.y - vector2.getY());
  }

  // ベクトルに係数を乗して（除して）新しいベクトルを作る
  multiply(val) {
    return new Vector2d(this.x * val, this.y * val);
  }
  devide(val) {
    return new Vector2d(this.x / val, this.y / val);
  }

  // ベクトルに係数を乗除する
  multiplyBy(val) {
    this.x *= val;
    this.y *= val;
  }

  devideBy(val) {
    this.x /= x;
    this.y /= y;
  }

  // ベクトル同士の加減乗除
  addTo(vector2) {
    this.x += vector2.getX();
    this.y += vector2.getY();
  }

  subtractFrom(vector2) {
    this.x -= vector2.getX();
    this.y -= vector2.getY();
  }
}

class Particle {
  constructor(x, y, speed, direction, grav) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;
    this.mass;
    this.radius = 4;
    this.bounce;
    this.friction = 1;
    this.gravity = grav || 0;
  }

  display() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillSyle = "#000";
    context.fill();
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy); // 直角三角形の斜辺
  }

  setSpeed(speed) {
    const heading = this.getHeading(); // angleのこと=直角三角形の角度
    this.vx = Math.cos(heading) * speed; // speedは直角三角形の斜辺の長さ
    this.vy = Math.sin(heading) * speed; // speedは直角三角形の斜辺の長さ
  }

  getHeading() {
    return Math.atan2(this.vy, this.vx);
  }

  setHeading(heading) {
    const speed = this.getSpeed(); // angleのこと=直角三角形の角度
    this.vx = Math.cos(heading) * speed; // speedは直角三角形の斜辺の長さ
    this.vy = Math.sin(heading) * speed; // speedは直角三角形の斜辺の長さ
  }

  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  }

  update() {
    // 摩擦
    this.vx *= this.friction;
    this.vy *= this.friction;
    // 重量
    this.vy += this.gravity;
    // 最終的な位置
    this.x += this.vx;
    this.y += this.vy;
  }

  angleTo(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  }

  distanceTo(p2) {
    const dx = p2.x - this.x;
    const dy = p2.y - this.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  // 引力
  gravitateTo(p2) {
    const dx = p2.x - this.x;
    const dy = p2.y - this.y;
    const distSQ = dx * dx + dy * dy;
    const dist = Math.sqrt(distSQ);
    const force = p2.mass / distSQ; // 引力 = m / r2
    const ax = (dx / dist) * force; // dx / dist = Math.atan2(dy, dx) ★角度から斜辺の長さ求める
    const ay = (dy / dist) * force;

    this.vx += ax;
    this.vy += ay;
  }

  springTo(point, k, length) {
    // point: バネの目標地点
    // k: バネ係数
    // length: offset（目標地点までのオフセット距離）
    const dx = point.x - this.x;
    const dy = point.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const springForce = (dist - length || 0) * k;
    const ax = (dx / dist) * springForce;
    const ay = (dy / dist) * springForce;

    this.vx += ax;
    this.vy += ay;
  }

  addSpring(point, k, length) {
    this.springs.push({
      point: point,
      k: k,
      length: length,
    });
  }
}

// new
const utils = new Utils();

// var
const p0 = {
  x: utils.randomRange(0, width),
  y: utils.randomRange(0, height),
};
const p1 = {
  x: utils.randomRange(0, width),
  y: utils.randomRange(0, height),
};
const p2 = {
  x: utils.randomRange(0, width),
  y: utils.randomRange(0, height),
};
const p3 = {
  x: utils.randomRange(0, width),
  y: utils.randomRange(0, height),
};
let t = 0;
let direction = 0.01;
const pFinal = {};

// new
const circle0 = new Particle(p0.x, p0.y, 0, 0);
const circle1 = new Particle(p1.x, p1.y, 0, 0);
const circle2 = new Particle(p2.x, p2.y, 0, 0);
const circle3 = new Particle(p3.x, p3.y, 0, 0);

render();

function render() {
  context.clearRect(0, 0, width, height);

  // コントロールポイントの描画
  circle0.display();
  circle1.display();
  circle2.display();
  circle3.display();

  // canvasでベジェ曲線描画
  context.beginPath();
  context.moveTo(p0.x, p0.y);
  context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  context.stroke();

  // ベジェ曲線上を動くボールを描画
  utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
  console.log(pFinal)
  context.beginPath();
  context.arc(pFinal.x, pFinal.y, 10, 0, Math.PI * 2, false);
  context.fill();

  // ボールが始点か終点に達すると、逆向きに動く
  if(t > 1 || t < 0) {
    direction *= -1;
  }

  // ボールを動かす
  t += direction;

  window.requestAnimationFrame(render);
}
