export {
    canvasApp
}

function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const range = 50;
    const centerY = canvas.height / 2;
    const xspeed = 1;
    const yspeed = 0.05;
    let xpos = 0;
    let ypos = centerY;
    let angle = 0;

    ctx.lineWidth = 2;

    (function draw() {
        window.requestAnimationFrame(draw);

        ctx.beginPath();
        ctx.moveTo(xpos, ypos);
        xpos += xspeed;
        angle += yspeed;
        ypos = centerY + Math.sin(angle) * range;
        ctx.lineTo(xpos, ypos);
        ctx.stroke();
    }())

    return canvas;
}
