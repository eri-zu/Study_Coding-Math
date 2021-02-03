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

  // 値をセット
  setX(value) {
    this.x = value;
  }

  setY(value) {
    this.y = value;
  }

  // 値を取得
  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  // 加減乗除
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

  // ★ベクトル同士の加算
  addTo(vector2) {
    this.x += vector2.getX();
    this.y += vector2.getY();
  }

  // ベクトルの大きさを取得
  getLength() {
    return Math.sqrt(this.x * this.x, this.y * this.y);
  }

  // ベクトルの角度を取得
  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  // ベクトルの大きさをセットする
  setLength(length) {
    const angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.cos(angle) * length;
  }

  // ベクトルの角度をセットする
  setAngle(angle) {
    const length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }
}

class Particle {
  constructor(x, y, speed, direction, grav) {
    // init
    this.position = new Vector2d(x, y);
    this.velocity = new Vector2d(0, 0);
    this.gravity = new Vector2d(0, grav || 0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    // var 
    this.radius = 10;
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
    context.fillStyle = "#000";
    context.fill();
  }

  move() {
    this.position.addTo(this.velocity);
  }

  gravitate() {
    this.velocity.addTo(this.gravity);
  }

}

let particles = [];
let particle;
const num = 100;

for (let i = 0; i < num; i++) {
  particle= new Particle(width / 2, height / 4, Math.random() * 4 + 1,Math.random() * Math.PI * 2,0.1 );
  particles.push(particle);
}

render();

function render() {
  context.clearRect(0, 0, width, height);

  console.log(particles.length) // 画面の外にでたパーティクルは配列から削除

  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].move();
    particles[i].gravitate();
  }

  deleteDeadParticle();

  window.requestAnimationFrame(render);
}

function deleteDeadParticle() {

  for (let i = particles.length - 1 ; i >= 0; i--) {
    if (
      particles[i].position.getX() - particles[i].radius > width ||
      particles[i].position.getX() + particles[i].radius < 0 ||
      particles[i].position.getY() - particles[i].radius > height ||
      particles[i].position.getY() + particles[i].radius < 0
    ) {
      particles.splice(i, 1);
    }
  }
}