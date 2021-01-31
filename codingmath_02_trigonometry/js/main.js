'use strict';
// sin waveをかく
{
	window.onload = function() {
		const canvas = document.getElementById('canvas'),
	       	context = canvas.getContext('2d'),
		      width = canvas.width = window.innerWidth,
		      height = canvas.height = window.innerHeight;

		context.translate(0, height / 2); //yが見切れてしまうので移動
		context.scale(1, -1); // canvasでは下がプラスになるので、波を反転させる

	  for(let angle = 0; angle < Math.PI * 2; angle += 0.01) {
			// 0 < angle < 6.28
			console.log(angle)

			let x = angle * 200,
			    y = Math.sin(angle) * 200;
					context.fillRect(x, y, 5, 5);
		}
	}


}

// 斜辺　hyponenius
// angleAを基準として
// 斜辺: hypotenuse, angleAの向かい側: opposite side, angleAの隣で斜辺じゃない側の辺: adjacent side
// siinA: o / h , cons A: a / h,  tanA o / a
// sinはy cosはx

// 考慮しなければならないこと
// ①coordinate system 座標系
// y軸の正負が逆なので角度の30度とかの取り方も逆になる（半時計回りに正となる）
// ②unit of angle 角度の単位 角度を弧の長さで表す
// ラジアンで表すこと
// 1radian = 57.3deg
// 360deg = 6.28radian = 2πradian