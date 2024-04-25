import Ball from '../utils/ball.js'

export default () => {
    const main = document.querySelector('main');
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    main.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    const range = 50;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const xSpeed = 0.07;
    const ySpeed = 0.11;
    let angleX = 0;
    let angleY = 0;

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = centerX + Math.sin(angleX) * range;
        ball.y = centerY + Math.sin(angleY) * range;
        angleX += xSpeed;
        angleY += ySpeed;
        ball.draw(ctx);
    }())
}
