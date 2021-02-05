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

  subtractFrom(vector2) {
    this.x -= vector2.getX();
    this.y -= vector2.getY();
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
    // this.springPoint = new Vector2d(width / 2, height / 2); // 重りの持つベクターがバネ運動をする先の位置（目標位置）
    this.distance; // バネの運動先と重りの位置の距離
    this.springForce; // バネの力（=加速度）
    this.sepation = 100; //重りと目標到達地点は最低100とるようにする
    this.friction = 0.9; // 摩擦
    this.radius = 20;
    this.k = 0.01;
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
    this.velocity.multiplyBy(this.friction); // 摩擦力を伴うはやさ=>いずれ重りは動かなくなる
    this.velocity.addTo(this.gravity); 
    this.position.addTo(this.velocity); 
  }

  // バネ運動
  spring(p2) {
    // 2つの重りの距離
    this.distance = p2.position.subtract(this.position);
    // distanceからoffset100を引いて新しいdistanceをセットする
    this.distance.setLength(this.distance.getLength() - this.sepation);
    // その距離にバネ係数をかけて、バネの力（加速度）を求める = これは公式
    this.springForce = this.distance.multiply(this.k);
    // 速度にその力を加える（加速度なので）
    this.velocity.addTo(this.springForce);
    // p2には、p2と逆向きの正反対の力がかかる
    // = reverceしたthis.springForceを加えるのと同じ結果が得られる
    p2.velocity.subtractFrom(this.springForce); 
  }
}

// 動く重り
const weightA = new Particle(Math.random() * width, Math.random() * height, 50,Math.random() * Math.PI * 2, 0);
const weightB = new Particle(Math.random() * width, Math.random() * height, 50,Math.random() * Math.PI * 2, 0);

render();

function render() {
  context.clearRect(0, 0, width, height);

  weightA.display();
  weightA.move();

  weightB.display();
  weightB.move();

  weightA.spring(weightB);


  // 重り同士を結ぶ線
  context.beginPath();
  context.moveTo(weightA.position.getX(), weightA.position.getY());
  context.lineTo(weightB.position.getX(), weightB.position.getY());
  context.stroke();

  window.requestAnimationFrame(render);
}
