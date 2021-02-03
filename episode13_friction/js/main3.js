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

  // ベクトルの角度をセットする
  setAngle(angle) {
    const length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  // ベクトルの角度を取得
  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  // ベクトルの大きさをセットする
  setLength(length) {
    const angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  // ベクトルの大きさを取得
  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
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
    this.radius;
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
  particle = new Particle(width / 2, height, Math.random() * 8 + 5, -Math.PI / 2 + (Math.random() * 0.2 - 0.1), 0.1);
  particles.push(particle);
  particle.radius = Math.random() * 10 + 5;
}

render();

function render() {
  context.clearRect(0, 0, width, height);

  for (let i = 0; i < 100; i++) {
    particles[i].display();
    particles[i].move();
    particles[i].gravitate();

    // 下に落ちて画面から見えなくなったパーティクルはエミッターの位置に戻され、再度発射される
    if (particles[i].position.getY() - particles[i].radius > height) {
      particles[i].position.setX(width / 2);
      particles[i].position.setY(height);
      particles[i].velocity.setLength(Math.random() * 8 + 5);
      particles[i].velocity.setAngle(
        -Math.PI / 2 + (Math.random() * 0.2 - 0.1)
      );
    }
  }

  window.requestAnimationFrame(render);
}
