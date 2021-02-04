"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setX(value) {
    this.x = value;
  }

  setY(value) {
    this.y = value;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  add(x, y) {
    this.x += x;
    this.y += y;
  }

  sub(x, y) {
    this.x -= x;
    this.y -= y;
  }

  mul(x, y) {
    this.x *= x;
    this.y *= y;
  }

  div(x, y) {
    this.x /= x;
    this.y /= y;
  }

  addTo(vector2) {
    this.x += vector2.getX();
    this.y += vector2.getY();
  }

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
}

class Utils {
  constructor() {}

  distance(c1, c2) {
    const dx = c1.position.getX() - c2.position.getX();
    const dy = c1.position.getY() - c2.position.getY();

    return Math.sqrt(dx * dx + dy * dy);
  }

  distanceXY(x, y, x1, y1) {
    const dx = x1 - x;
    const dy = y1 - y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  cirlceCollision(c1, c2) {
    return this.distance(c1, c2) <= c1.radius + c2.radius;
  }

  circlePointCollision(x, y, c1) {
    return this.distanceXY(x, y, c1.position.getX(), c1.position.getY()) <= c1.radius;
  }

  pointInRect(x, y, rect) {
    // point x が長方形の左端から右端の間にあって かつ
    // point y が長方形の上端から端端の間にある

    return this.inRange(x, rect.x, rect.x + rect.width) && this.inRange(y, rect.y, rect.y + rect.height);

  }

  inRange(value, min, max) {
    // return value > min && value < max;

    // widthとheightを負の値にすると上の式は機能しない（widthとheightが負の値、つまり左下の頂点から書き始めるということ）
    // そのまま代入すると、min が80, widthが-20, maxが60 のようになる
    // min, maxを柔軟に

    return value >= Math.min(min, max) && value <= Math.max(min, max);

  }
}

let utils;
let mouseX;
let mouseY;
const rectangle = {
  x: 300, 
  y: 200,  
  width: -200, // 通常はプラスの値だが、マイナスにすると機能しなくなるので、関数を少しいじる必要がある
  height: -100
}

utils = new Utils();

document.body.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  context.clearRect(0, 0, width, height);

  if (utils.pointInRect(mouseX, mouseY, rectangle)) {
    context.fillStyle = "#f66";
  } else {
    context.fillStyle = "#000";
  }

  context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
});
