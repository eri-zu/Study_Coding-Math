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
  constructor(x, y, speed, direction) {
    this.position = new Vector2d(x, y);
    this.velocity = new Vector2d(0, 0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
  }

  // 2点間の距離
  distanceTo(p) {
    const dx = p.getX() - this.getX();  
    const dy = p.getY() - this.getY();  
    const d = Math.sqrt()
  }

  // 角度
  angleTo() {

  }


  move() {
    this.position.addTo(this.velocity);
  }
}

const sun = new Particle(width / 2, height / 2, 0, 0);
const earth = new Particle(width / 2, height / 2, 0, 0);
const mass = 2000; // sunの大きさ

render();

function render() {
  context.clearRect(0, 0, width, height);

  // sun
  context.beginPath();
  context.arc(
    sun.position.getX(),
    sun.position.getY(),
    20,
    0,
    Math.PI * 2,
    false
  );
  context.fillStyle = "yellow";
  context.fill();

  // earth
  context.beginPath();
  context.arc(
    earth.position.getX(),
    earth.position.getY(),
    10,
    0,
    Math.PI * 2,
    false
  );
  context.fillStyle = "#386DED";
  context.fill();

  window.requestAnimationFrame(render);
}
