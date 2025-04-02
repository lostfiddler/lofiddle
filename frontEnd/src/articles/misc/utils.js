export function resize(canvas) {
    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;

    canvas.style.width = `${canvas.width / 2}`
    canvas.style.height = `${canvas.height / 2}`
}
