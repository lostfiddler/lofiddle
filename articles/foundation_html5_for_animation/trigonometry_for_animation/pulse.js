import Ball from '../utils/ball.js';

export {
    canvasApp
}

function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    let angle = 0;
    let centerScale = 1;
    let range = 0.5;
    let speed = 0.05;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.scaleX = ball.scaleY = centerScale + Math.sin(angle) * range;
        angle += speed;
        ball.draw(ctx);
    }());

    return canvas;
}
