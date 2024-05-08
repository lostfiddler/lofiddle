import Ball from '../utils/ball.js';

export default () => {
    canvasApp();
}

function canvasApp() {
    const main = document.querySelector('main');
    const canvas = document.createElement('canvas');
    main.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    let centerX;
    let centerY;
    const radius = 50;
    const speed = 0.05;
    let angle = 0;

    (function draw() {
        window.requestAnimationFrame(draw);
        resizeCanvas(canvas)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = centerX + Math.sin(angle) * radius;
        ball.y = centerY + Math.cos(angle) * radius;
        angle += speed;
        ball.draw(ctx);
    }())

    function resizeCanvas(canvas) {
        canvas.width = canvas.parentElement.clientWidth * 0.8;
        canvas.height = canvas.width * (9/16);
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
    }
}
