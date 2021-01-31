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
    this.arrowX = width / 2; // 矢印の場所x
    this.arrowY = height / 2; // 矢印の場所y
    this.angle = 0;
  }

  display() {
    context.save(); // saveからrestore内であれば座標軸は移動したものが適用される
    context.translate(this.arrowX, this.arrowY); // 矢印をおきたい場所を考える（今回はwindowの中心）→そこへ座標軸を移動させて、矢印の位置を"（0, 0）"とする
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

  rotate() {
    document.body.addEventListener("mousemove", (e) => { //マウスの位置は座標軸はwinodwの左上を原点（通常通り）で考える
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.distX = this.mouseX - this.arrowX; // マウスと矢印の距離x
      this.distY = this.mouseY - this.arrowY; // マウスと矢印の距離y

      this.angle = Math.atan2(this.distY, this.distX); // Math.atan2(距離y, 距離x)=>角度を求める
    });
  }
}

const arrow = new Arrow();
arrow.rotate();
render();

function render() {
  context.clearRect(0, 0, width, height);
  arrow.display();

  window.requestAnimationFrame(render);
}

// arctangent2
// (0, 0)から任意の点（x, y）を結んだ時にできる角度を求めることができる
// いつでもマウスの方向をむく矢印を作りたいとする
// 角度がわかれば、その分矢印を回転させれば良い

