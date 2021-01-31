"use strict";
// lissajous curve
{
  window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight);

    const centerX = width / 2;
    const centerY = height / 2;
    const radiusX = 200;
    const radiusY = 300;
    const speedX = 0.1;
    const speedY = 0.131;
    let posX = 0;
    let posY = 0;
    let angleX = 0;
    let angleY = 0;

    render();

    function render() {
      context.clearRect(0, 0, width, height);

      posX = centerX + radiusX * Math.sin(angleX);
      posY = centerY + radiusY * Math.cos(angleY);

      context.fillStyle = "#000";
      context.beginPath();
      context.arc(posX, posY, 10, 0, Math.PI * 2, false);
      context.fill();
      context.stroke();

      angleX += speedX;
      angleY += speedY;

      window.requestAnimationFrame(render);
    }
  });
}
