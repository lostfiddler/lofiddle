import Ball from '../utils/ball.js';

export default () => {
    canvasApp();
}

function canvasApp() {
    const main = document.querySelector('main');
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    main.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;
    const speed = 0.05;
    let angle = 0;

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = centerX + Math.sin(angle) * radius;
        ball.y = centerY + Math.cos(angle) * radius;
        angle += speed;
        ball.draw(ctx);
    }())
}
