"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d"); // 弾丸を描写
const targetCanvas = document.getElementById("target");
const targetContext = targetCanvas.getContext("2d"); // ヒットされるオブジェクトの描画領域
const width = (canvas.width = targetCanvas.width = window.innerWidth);
const height = (canvas.height = targetCanvas.height = window.innerHeight);

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
    this.radius;
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
const fl = 300;
const centerZ = 2000; //配置する円形の中心点
const radius = 1000; // 配置する円形の半径
const num = 200;
let rotationSpeed = 0.01; // マウスが(0, 0)にあっても微妙に動く
let baseAngle = 0;
let points = [];

for (let i = 0; i < num; i++) {
  const point = {
    y: 2000 - (4000 / num) * i, // -2000 から2000の間にパーティクルをevenに配置する -2000 + 4000 / num * i でもok
    angle: ((Math.PI * 2 * 6) / num) * i, // 円形に配置するが、6つのスパイラルを書きたい（円6周）ので Math.PI * 2 * 6
  };

  point.x = Math.cos(point.angle + baseAngle) * radius; // 横
  point.z = centerZ + Math.sin(point.angle + baseAngle) * radius; // 奥行き

  points.push(point);
}

context.translate(width / 2, height / 2); // windowの中心を(0, 0とする)

document.body.addEventListener("mousemove", (e) => {
  rotationSpeed = (e.clientX - width / 2) * 0.00005;
  // ypos = (e.clientY - height / 2) * 2;
});

render();

function render() {
  baseAngle += rotationSpeed;

  context.clearRect(-width / 2, -height / 2, width, height);

  context.beginPath();
  // shapeを描く
  for (let i = 0; i < num; i++) {
    const perspective = fl / (fl + points[i].z);

    context.save();
    context.scale(perspective, perspective);
    context.translate(points[i].x, points[i].y); // それぞれのポイントをcanvasごとずらす

    // point同志を結ぶ
    if (i == 0) {
      context.moveTo(0, 0); // ので全ての座標は(0, 0)でok
    } else {
      context.lineTo(0, 0)
    }

    context.restore();

    // pointのpositionを更新
    points[i].x = Math.cos(points[i].angle + baseAngle) * radius;
    points[i].z = centerZ + Math.sin(points[i].angle + baseAngle) * radius;
  }
  context.stroke();

  window.requestAnimationFrame(render);
}
