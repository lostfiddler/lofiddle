import captureMouse from '../utils/captureMouse.js';

export default () => {
    const main = document.querySelector('main');
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    main.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const mouse = captureMouse(canvas);
    const log = document.createElement('pre');
    const rect = { x: canvas.width / 2, y: canvas.height / 2 };

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const dx = rect.x - mouse.x;
        const dy = rect.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        ctx.fillStyle = '#000';
        ctx.fillRect(rect.x - 2, rect.y - 2, 4, 4);
        // draw line
        ctx.beginPath();
        ctx.moveTo(rect.x, rect.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();

        log.textContent = dist;
    }())

    main.appendChild(log);
}
