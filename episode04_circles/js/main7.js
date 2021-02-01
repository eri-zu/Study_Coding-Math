"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const context2 = canvas2.getContext("2d");

const width = (canvas.width = canvas2.width = window.innerWidth);
const height = (canvas.height = canvas2.height = window.innerHeight);

class Ball {
  constructor() {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radius = height / 4;
    this.angle = 0;
    this.posX = 0;
    this.posY = 0;
  }

  display() {
    context.fillStyle = "#2C6EA1";
    context.beginPath();
    context.arc(this.posX, this.posY, 10, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
  }

  move() {
    this.posX = this.centerX + this.radius * Math.cos(this.angle);
    this.posY = this.centerY + this.radius * Math.sin(this.angle);
    this.angle += 0.01;
  }
}

class Rectangle {
  constructor() {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radius = height / 4;
    this.angle = 0;
    this.posX = 0;
    this.posY = 0;
  }

  display() {
    context2.fillStyle = "#fff";
    // context2.beginPath();
    // context2.rect(this.posX, this.posY, 1, 1);
    // context2.fill();

    if(this.angle < Math.PI * 2) {
      context2.beginPath();
      context2.arc(this.posX, this.posY, 1, 0, Math.PI * 2, false);
      context2.fill();
      context2.stroke();
    } else {
      return;
    }
  }

  move() {
    this.posX = this.centerX + this.radius * Math.cos(this.angle);
    this.posY = this.centerY + this.radius * Math.sin(this.angle);
    this.angle += 0.01;
  }
}

let ball;
let rectangle;

setup();

function setup() {
  ball = new Ball();
  rectangle = new Rectangle();
}

render();

function render() {
  context.clearRect(0, 0, width, height);

  ball.display();
  ball.move();

  rectangle.display();
  rectangle.move();

  window.requestAnimationFrame(render);
}
