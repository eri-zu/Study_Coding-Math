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
  constructor() {
    // 位置(position)と速度（velocity）のベクター    
    this.position = new Vector2d(100, 100);
    this.velocity = new Vector2d(0, 0);

    // vector length (= magnitude) & angle
    // velocityは長さが3で、30degの方向にあるベクトルになる
    this.velocity.setLength(3); 
    this.velocity.setAngle(Math.PI / 6);
  }

  display() {
    context.beginPath();
    context.arc(this.position.getX(), this.position.getY(), 10, 0, Math.PI * 2, false );
    context.fillStyle = "#000"
    context.fill();
    context.stroke();
  }

  move() {
    // poistionにvelocity加える
    this.position.addTo(this.velocity);
  }

}

const particle = new Particle();
render();

function render() {
  context.clearRect(0, 0, width, height);
  particle.display();
  particle.move();

  window.requestAnimationFrame(render);
}