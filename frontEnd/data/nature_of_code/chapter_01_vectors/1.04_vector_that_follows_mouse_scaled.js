export default () => {
    const main = document.querySelector('main');
    const canvas = document.createElement("canvas");
    canvas.width = 1066;
    canvas.height = 600;
    main.appendChild(canvas);

    const width = canvas.width;
    const height = canvas.height;

    const ctx = canvas.getContext('2d');

    let mouse = [];
    let origin = [width / 2, height / 2]

    document.addEventListener("mousemove", (e) => {
        mouse = [(e.clientX + origin[0]) * 0.5, (e.clientY + origin[1]) * 0.5]
        console.log(mouse)
    })

    window.requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, width, height);


        ctx.beginPath();
        ctx.moveTo(origin[0], origin[1]);
        ctx.lineTo(mouse[0], mouse[1]);
        ctx.closePath();
        ctx.stroke();

        window.requestAnimationFrame(draw);
    }
}
