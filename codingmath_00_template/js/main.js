"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Ball {
  constructor() {
    
  }

  display() {

  }

  move() {

  }


}

const ball = new Ball();
render();

function render() {
  context.clearRect(0, 0, width, height);
  ball.display();
  ball.move();

  window.requestAnimationFrame(render);
}


