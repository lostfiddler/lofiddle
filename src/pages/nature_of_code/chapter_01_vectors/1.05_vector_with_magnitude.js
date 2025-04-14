export function article() {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h1')
    title.textContent = 'Vector with Magnitude'


    fragment.append(title, canvasApp())
    return fragment
}

function canvasApp() {
    const canvas = document.createElement("canvas");
    canvas.width = 1066;
    canvas.height = 600;

    const width = canvas.width;
    const height = canvas.height;

    const ctx = canvas.getContext('2d');

    let mouse = [];
    let origin = [width / 2, height / 2]
    let magnitude;

    document.addEventListener("mousemove", (e) => {
        mouse = [e.clientX, e.clientY]
        magnitude = Math.sqrt(Math.pow(mouse[0] - origin[0], 2) + Math.pow(mouse[1] - origin[1], 2));
    })


    window.requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, width, height);
        console.log(magnitude)


        ctx.beginPath();
        ctx.moveTo(origin[0], origin[1]);
        ctx.lineTo(mouse[0], mouse[1]);
        ctx.closePath();
        ctx.stroke();

        ctx.fillRect(0, 0, magnitude, 10);

        window.requestAnimationFrame(draw);
    }
    return canvas
}
