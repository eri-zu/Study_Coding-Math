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

let particle;

particle = new Particle(10, 10, 10, Math.PI / 6);

render();

function render() {
  context.clearRect(0, 0, width, height);

  particle.display();
  particle.move();
  particle.gravitate();

  // bounce
  // 壁に当たると逆方向に跳ね返る
  if (particle.position.x + particle.radius > width) {
    particle.position.setX(width - particle.radius);
    particle.velocity.setX(particle.velocity.getX() * -1);
  }
  if (particle.position.x - particle.radius  < 0) {
    particle.position.setX(particle.radius);
    particle.velocity.setX(particle.velocity.getX() * -1);
  }
  if (particle.position.y + particle.radius > height) {
    particle.position.setY(height - particle.radius);
    particle.velocity.setY(particle.velocity.getY() * -1);
  }
  if (particle.position.y - particle.radius  < 0) {
    particle.position.setY(particle.radius);
    particle.velocity.setY(particle.velocity.getY() * -1);
  }

  window.requestAnimationFrame(render);
}
