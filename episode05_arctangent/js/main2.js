"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Arrow {
  constructor() {
    this.mouseX;
    this.mouseY;
    this.distX;
    this.distY;
    this.posX = 0; // 矢印の場所x
    this.posY = 0; // 矢印の場所y
    this.angle = 0; // 矢印の向く方向の回転角度
    this.angle2 = 0; // 矢印そのものが動く円の描く際に使う角度
  }

  display() {
    context.save(); // saveからrestore内であれば座標軸は移動したものが適用される
    context.translate(this.posX, this.posY); // 矢印をおきたい場所を考える（今回はwindowの中心）→そこへ座標軸を移動させて、矢印の位置を"（0, 0）"とする
    context.rotate(this.angle); // 座標軸を回転させることで、矢印も回転することになる

    context.beginPath();
    context.moveTo(20, 0);
    context.lineTo(-20, 0);
    context.closePath();
    context.moveTo(20, 0);
    context.lineTo(10, -10);
    context.closePath();
    context.moveTo(20, 0);
    context.lineTo(10, 10);
    context.stroke();

    context.restore();
  }

  move() {
    this.posX = width / 2 + height / 4 * Math.cos(this.angle2);
    this.posY = height / 2 + height / 4 * Math.sin(this.angle2);

    this.angle2 += 0.01;
  }

  rotate() {
    document.body.addEventListener("mousemove", (e) => { //マウスの位置は座標軸はwinodwの左上を原点（通常通り）で考える
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.distX = this.mouseX - this.posX; // マウスと矢印の距離x
      this.distY = this.mouseY - this.posY; // マウスと矢印の距離y

      this.angle = Math.atan2(this.distY, this.distX); // Math.atan2(距離y, 距離x)=>角度を求める
    });
  }
}

const arrow = new Arrow();
render();
arrow.rotate();

function render() {
  context.clearRect(0, 0, width, height);
  arrow.display();
  arrow.move();

  window.requestAnimationFrame(render);
}

// arctangent2
// (0, 0)から任意の点（x, y）を結んだ時にできる角度を求めることができる
// いつでもマウスの方向をむく矢印を作りたいとする
// 角度がわかれば、その分矢印を回転させれば良い

