function app() {
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    const slider = document.getElementById('slider');

    window.requestAnimationFrame(draw);

    function draw() {
        const degree = slider.value;
        const toRadian = degree * Math.PI / 180; // Convert to radian for easier calculations
        const theta = 2 * Math.PI - toRadian; // Change rotation of terminalSide to counterclockwise

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        circle();
        initialSide();
        terminalSide(theta);

        window.requestAnimationFrame(draw);
    }
}

module.exports = app;