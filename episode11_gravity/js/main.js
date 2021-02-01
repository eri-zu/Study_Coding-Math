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

  move() {
    this.position.addTo(this.velocity);
  }

  //------------------------------------------------------
  // 以下は加速度（重力）の計算
  // 加速度を地球と太陽の位置関係及び太陽の大きさから求める
  //-------------------------------------------------------

  //  地球と太陽の2点間が作り出す角度（これが重力ベクトルの持つ大きさとなる）
  distanceTo(p2) {
    let dx = p2.position.getX() - this.position.getX();
    let dy = p2.position.getY() - this.position.getY();

    return Math.sqrt(dx * dx + dy * dy);
  }

  // 地球と太陽の2点間が作り出す角度（これが重力ベクトルの持つ角度=方向となる）
  angleTo(p2) {
    let dx = p2.position.getX() - this.position.getX();
    let dy = p2.position.getY() - this.position.getY();

    return Math.atan2(dy, dx);
  }

  // 重力を求める
  gravitateTo(p2) {
    var gravity = new Vector2d(0, 0);
    var dist = this.distanceTo(p2);

    gravity.setLength(p2.mass / (dist * dist)); // ★重力の公式 g = m / d2 万有引力は２つの物体が近いほど強く作用するので、距離が公式に使われる
    gravity.setAngle(this.angleTo(p2));

    // 加速を速さに足す
    this.velocity.addTo(gravity);
  }
}

const earth = new Particle(width / 2 + 200, height / 2, 10, -Math.PI / 2); // 初期値は太陽の真横にある 速度は真上向きの力
const sun = new Particle(width / 2, height / 2, 0, 0); //太陽は動かないので、速度0 向き0
sun.mass = 20000; // sunの大きさ

render();

function render() {
  context.clearRect(0, 0, width, height);

  earth.move();
  earth.gravitateTo(sun);

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
    5,
    0,
    Math.PI * 2,
    false
  );
  context.fillStyle = "#386DED";
  context.fill();

  window.requestAnimationFrame(render);
}
