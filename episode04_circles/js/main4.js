"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Ball {
  constructor() {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radiusX = 200;
    this.radiusY = 300;
    this.speedX = 0.1;
    this.speedY = 0.131;
    this.posX = 0;
    this.posY = 0;
    this.angleX = 0;
    this.angleY = 0;
  }

  display() {
    context.fillStyle = "#000";
    context.beginPath();
    context.arc(this.posX, this.posY, 10, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
  }

  move() {
    this.posX = this.centerX + this.radiusX * Math.sin(this.angleX);
    this.posY = this.centerY + this.radiusY * Math.cos(this.angleY);
    this.angleX += this.speedX;
    this.angleY += this.speedY;
  }
}

const ball = new Ball();
render();

function render() {
  ball.display();
  ball.move();

  window.requestAnimationFrame(render);
}



