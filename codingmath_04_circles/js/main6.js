"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Ball {
  constructor(angle) {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radius = height / 4;
    this.angle = angle;
    this.posX = 0;
    this.posY = 0;
  }

  display() {
    context.fillStyle = "#000";
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
    balls[i].move();
    
  }

  window.requestAnimationFrame(render);
}
