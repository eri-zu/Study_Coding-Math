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
  }

  display() {
    context.beginPath();
    context.arc(
      this.position.getX(),
      this.position.getY(),
      10,
      0,
      Math.PI * 2,
      false
    );
    context.fillStyle = "#000";
    context.fill();
  }

  move() {
    this.position.addTo(this.velocity); // 元いる位置に動くよう力を加える（今回velocityは0なので加速度だけで動く）
  }

  accelerate() {
    // キーを押し続けるとどんどん早く船が動く
    this.velocity.addTo(this.force);

    // this.forceの内容は以下の通り
    document.body.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 38: // up
          this.force.setY(-0.1);
          break;
        case 40: // down
          this.force.setY(0.1);
          break;
        case 37: // left
          this.force.setX(-0.1);
          break;
        case 39: // right
          this.force.setX(0.1);
          break;

        default:
          break;
      }
    });

    document.body.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 38: // up
          this.force.setY(0);
          break;
        case 40: // down
          this.force.setY(0);
          break;
        case 37: // left
          this.force.setX(0);
          break;
        case 39: // right
          this.force.setX(0);
          break;

        default:
          break;
      }
    });
  }

  backforth() {
    // 画面の端から出てしまうと逆側の端からまた出てくるようにする
    if(this.position.getX() > width) {
      this.position.setX(0);
    } else if(this.position.getX() < 0) {
      this.position.setX(width);
    } else if(this.position.getY() > height) {
      this.position.setY(0)
    } else if(this.position.getY() < 0) {
      this.position.setY(height)
    }
  }
}

const ship = new Ship(width / 2, height / 2, 0, 0);

render();

function render() {
  context.clearRect(0, 0, width, height);

  ship.display();
  ship.move();
  ship.accelerate();
  ship.backforth();

  window.requestAnimationFrame(render);
}
