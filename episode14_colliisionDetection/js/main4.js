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
    return (
      this.distanceXY(x, y, c1.position.getX(), c1.position.getY()) <= c1.radius
    );
  }

  pointInRect(x, y, rect) {
    // point x が長方形の左端から右端の間にあって かつ
    // point y が長方形の上端から端端の間にある

    return (
      this.inRange(x, rect.x, rect.x + rect.width) &&
      this.inRange(y, rect.y, rect.y + rect.height)
    );
  }

  inRange(value, min, max) {
    // return value > min && value < max;

    // widthとheightを負の値にすると上の式は機能しない（widthとheightが負の値、つまり左下の頂点から書き始めるということ）
    // そのまま代入すると、min が80, widthが-20, maxが60 のようになる
    // min, maxを柔軟に

    return value >= Math.min(min, max) && value <= Math.max(min, max);
  }

  rangeInterset(min0, max0, min1, max1) {
    // rectA - min0, max0
    // rectB - min1, max1

    // return  max0 >= min1 && min0 <= max1;
    return (
      Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1)
    );
  }

  rectInterset(rect0, rect1) {
    return (
      this.rangeInterset(
        rect0.x,
        rect0.x + rect0.width,
        rect1.x,
        rect1.x + rect1.width
      ) &&
      this.rangeInterset(
        rect0.y,
        rect0.y + rect0.height,
        rect1.y,
        rect1.y + rect1.height
      )
    );
  }
}

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  display() {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

let utils;
let mouseX;
let mouseY;
let rectangle0;
let rectangle1;


utils = new Utils();

document.body.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  rectangle0 = new Rectangle(300, 200, 200, 100);
  rectangle1 = new Rectangle(mouseX - 100, mouseY - 50, 200, 100); // マウスをrectangleの中心に持ってきたいので

  context.clearRect(0, 0, width, height);

  if (utils.rectInterset(rectangle0, rectangle1)) {
    context.fillStyle = "#f66";
  } else {
    context.fillStyle = "#000";
  }

  rectangle0.display();
  rectangle1.display();

});
