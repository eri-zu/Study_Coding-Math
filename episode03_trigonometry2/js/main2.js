'use strict';
// cos waveをかく
{
	window.onload = function() {
		const canvas = document.getElementById('canvas'),
	       	context = canvas.getContext('2d'),
		      width = canvas.width = window.innerWidth,
		      height = canvas.height = window.innerHeight;

	  let centerX = width / 2,
				centerY = height / 2,
        baseRadius = 100,
				offset = 50, // 変化させるバッファ量的な（radiusは50~150の間で変化する）
				speed = 0.1,
				angle = 0;

		render();

		function render() {
		  let radius = baseRadius + Math.sin(angle) * offset;

			context.clearRect(0, 0, width, height); // キャンバスをクリアする(x, y, width, height)
			context.beginPath();
			context.arc(centerX, centerY, radius, 0, Math.PI * 2, false); // 円弧(中心x座標, 中心y座標, 半径, startAngle, endAngle [, anticlockwise]);
			context.fill();

			angle += speed;

			requestAnimationFrame(render);
		}

	}

}


