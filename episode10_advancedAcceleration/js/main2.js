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

class Ship {
  constructor(x, y, speed, direction) {
    this.position = new Vector2d(x, y);
    this.velocity = new Vector2d(0, 0); // = speed
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.force = new Vector2d(0, 0);
    this.angle = 0;

    this.turningRight = false; // 右に回転
    this.turningLeft = false; // 左に回転
    this.forceing = false; // 進む力（動力）
  }

  display() {
    context.save();
    context.translate(this.position.getX(), this.position.getY()); // 船のあるところを原点（0, 0）とする
    context.rotate(this.angle);

    context.beginPath();
    context.moveTo(10, 0); // 先端
    context.lineTo(-10, -7); // 左下
    context.lineTo(-10, 7); // 左上
    context.lineTo(10, 0);
    context.stroke();

    context.restore();
  }

  move() {
    // 初期の位置に速さを加えて動く
    this.position.addTo(this.velocity);
  }

  accel() {
    // キーを押し続けるとどんどん早く船が動く
    this.velocity.addTo(this.force);
  }

  keyControll() {
    // キー操作
    document.body.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37: // left 左回転
          this.turningLeft = true;
          break;
        case 39: // right 右回転
          this.turningRight = true;
          break;
        case 38: // up 動力を出力
          this.forceing = true;
          break;

        default:
          break;
      }
    });

    document.body.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 37: 
          this.turningLeft = false;
          break;
        case 39:
          this.turningRight = false;
          break;
        case 38: 
          this.forceing = false;
          break;

        default:
          break;
      }
    });

    if (this.turningRight) {
      this.angle += 0.05;
    }

    if (this.turningLeft) {
      this.angle -= 0.05;
    }

    // キーから指を離したらforceは0に
    if (this.forceing) {
      this.force.setLength(0.1);
    } else {
      this.force.setLength(0);
    }
    
    //船の進む方向は回転の角度と同じ
    this.force.setAngle(this.angle);
  }

  backforth() {
    // 画面の端から出てしまうと逆側の端からまた出てくるようにする
    if (this.position.getX() > width) {
      this.position.setX(0);
    } else if (this.position.getX() < 0) {
      this.position.setX(width);
    } else if (this.position.getY() > height) {
      this.position.setY(0);
    } else if (this.position.getY() < 0) {
      this.position.setY(height);
    }
  }
}

// 初期値はvelocity（speed）は0, direction（angle）も0
const ship = new Ship(width / 2, height / 2, 0, 0);

render();

function render() {
  context.clearRect(0, 0, width, height);

  ship.display();
  ship.move();
  ship.accel();
  ship.keyControll();
  ship.backforth();

  window.requestAnimationFrame(render);
}
