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

  setX(value) {
    this.x = value;
  }

  setY(value) {
    this.y = value;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  // ベクトルのx, yにそれぞれ値を加える
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

  // ベクトル同士の加算
  addTo(vector2) {
    this.x += vector2.getX();
    this.y += vector2.getY();
  }

  // ベクトル同士の減算して新しいベクトルを得る ※新しいベクトル作らなかったらunfinedになるので
  subtract(vector2) {
    return new Vector2d(this.x - vector2.getX(), this.y - vector2.getY());
  }

  // ベクトルに係数をかける
  multiplyBy(val) {
    this.x *= val;
    this.y *= val;
  }

  // ベクトルに係数をかけて新しいベクトルを得る
  multiply(k) {
    return new Vector2d(this.x * k, this.y * k);
  }

  setAngle(angle) {
    const length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setLength(length) {
    const angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

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
    this.springPoint = new Vector2d(0, 0); // 重りの持つベクターがバネ運動をする先の位置（目標位置）
    this.distance; // バネの運動先と重りの位置の距離
    this.springForce; // バネの力（=加速度）
    this.friction = 0.5 + Math.random() * 0.5;
    this.radius = 20;
    this.k = 0.01 + Math.random() * 0.5;
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
    this.velocity.multiplyBy(this.friction);
    this.position.addTo(this.velocity);
  }

  //バネ運動
  spring() {
    // 目標先の座標をマウスの座標にする
    window.addEventListener("mousemove", (e) => {
      this.springPoint.setX(e.clientX);
      this.springPoint.setY(e.clientY);
    });

    // そのマウス座標を元に目標先に丸い点を書く
    context.beginPath();
    context.arc(
      this.springPoint.getX(),
      this.springPoint.getY(),
      3,
      0,
      Math.PI * 2,
      false
    );
    context.fillStyle = "#000";
    context.fill();

    // そのマウス座標を元に目標先から重りに伸びる線wp書く
    context.beginPath();
    context.moveTo(this.springPoint.getX(), this.springPoint.getY());
    context.lineTo(weight.position.getX(), weight.position.getY());
    context.stroke();

    // 移動目標先と重りの距離（ベクトルの減算）
    this.distance = this.springPoint.subtract(this.position);
    // その距離にバネ係数をかけて、バネの力（加速度）を求める = これは公式
    this.springForce = this.distance.multiply(this.k);
    // 速度にその力を加える（加速度なので）
    this.velocity.addTo(this.springForce);
  }
}

// 動く重り
const weight = new Particle(
  Math.random() * width,
  Math.random() * height,
  50,
  Math.random() * Math.PI * 2
);

render();

function render() {
  context.clearRect(0, 0, width, height);

  weight.display();
  weight.move();
  weight.spring();

  window.requestAnimationFrame(render);
}
