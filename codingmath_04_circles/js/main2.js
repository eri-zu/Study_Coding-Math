'use strict';
// 楕円運動
{
	window.onload = function() {
		const canvas = document.getElementById('canvas'),
	       	context = canvas.getContext('2d'),
		      width = canvas.width = window.innerWidth,
		      height = canvas.height = window.innerHeight;

		const centerX = width / 2;
		const centerY = height / 2;
		const radiusX = 100;
		const radiusY = 300;
		const speed = 0.04;
		let angle = 0;
		let posX;
		let posY;

    render();

		function render() {
			angle += speed;
			posX = centerX + Math.cos(angle) * radiusX; //canvasは左上が原点なので、原点から見てcenterXにさらにradius足さないとダメ
			posY = centerY + Math.sin(angle) * radiusY;

			context.clearRect(0, 0, width, height);
			context.fillStyle = "#000";
			context.beginPath();
			context.arc(posX, posY, 20, 0, Math.PI * 2); // 中心座標を(posX, posY)とし、半径20を持つ360度の円弧をかく中心座標が変わるのでアニメーションされ続ける
			context.fill();
			context.stroke();

			window.requestAnimationFrame(render);

		}

	}

}