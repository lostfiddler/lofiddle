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
    const debug = document.createElement('pre')
    const speed = 0.1;
    const centerY = canvas.height / 2
    const range = 50;
    let angle = 0;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    console.log(ball);
    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.y = centerY + Math.sin(angle) * range;
        angle += speed;
        ball.draw(ctx);
        debug.textContent = ball.y;
    }())

    return canvas;
}
