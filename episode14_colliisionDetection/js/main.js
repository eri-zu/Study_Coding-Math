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

class Circle {
  constructor(x, y, r) {
    this.position = new Vector2d(x, y);
    this.radius = r;
  }

  display() {
    context.beginPath();
    context.arc(
      this.position.getX(),
      this.position.getY(),
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    context.fill();
  }
}

class Utils {
  constructor() {
  }

  distance(c1, c2) {
    const dx = c1.position.getX() - c2.position.getX();
    const dy = c1.position.getY() - c2.position.getY();;

    return Math.sqrt(dx * dx + dy * dy);
  }

  cirlceCollision(c1, c2) {
    return this.distance(c1, c2) <= c1.radius + c2.radius;;
  }
}

let circle1;
let circle2;
let utils;
let mouseX;
let mouseY;

circle1 = new Circle(width / 2, height / 2, 30);
circle2 = new Circle(0, 0, 40);
utils = new Utils();

document.body.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  circle2.position.setX(mouseX);
  circle2.position.setY(mouseY);

  if(utils.cirlceCollision(circle1, circle2)) {
    context.fillStyle = "#f66";
  } else {
    context.fillStyle = "#000";
  }

});


render();

function render() {
  context.clearRect(0, 0, width, height);

  circle1.display();
  circle2.display();

  window.requestAnimationFrame(render);
}
