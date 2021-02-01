"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Ball {
  constructor(angle) {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radius = 300;
    this.angle = angle;
    this.posX = 0;
    this.posY = 0;
  }

  display() {
    this.posX = this.centerX + this.radius * Math.sin(this.angle);
    this.posY = this.centerY + this.radius * Math.cos(this.angle);

    context.fillStyle = "#000";
    context.beginPath();
    context.arc(this.posX, this.posY, 10, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
  }

}

let balls = [];
const ballnum = 10;
let angle;

setup();

function setup() {
  for (let i = 0; i < ballnum; i++) {
    angle = Math.PI * 2 / ballnum * i;
    balls[i] = new Ball(angle);
  }
}

render();

function render() {
  context.clearRect(0, 0, width, height);

  for (let i = 0; i < ballnum; i++) {
    balls[i].display();
  }

  // window.requestAnimationFrame(render);
}
