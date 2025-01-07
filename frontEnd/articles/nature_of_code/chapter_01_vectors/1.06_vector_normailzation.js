export function article() {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h1')
    title.textContent = 'Vector Normailzation'


    fragment.append(title, canvasApp())
    return fragment
}

function canvasApp() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    canvas.width = 1066;
    canvas.height = 600;

    const width = canvas.width;
    const height = canvas.height;
    const origin = [width / 2, height / 2];

    document.addEventListener("mousemove", handleMouseMove);

    function handleMouseMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Calculate normalized vector
        const xComponent = mouseX - origin[0];
        const yComponent = mouseY - origin[1];
        const magnitude = Math.sqrt(xComponent ** 2 + yComponent ** 2);
        const normalizedX = xComponent / magnitude;
        const normalizedY = yComponent / magnitude;

        // Draw the line
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(origin[0], origin[1]);
        ctx.lineTo(origin[0] + normalizedX * 50, origin[1] + normalizedY * 50);
        ctx.stroke();
    }
    return canvas
}
