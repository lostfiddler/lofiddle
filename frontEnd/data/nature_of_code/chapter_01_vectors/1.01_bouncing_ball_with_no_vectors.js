export default () => {
    const main = document.querySelector('main');
    const canvas = document.createElement("canvas");
    canvas.width = 1066;
    canvas.height = 600;
    main.appendChild(canvas);
    const ctx = canvas.getContext("2d")

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let xspeed = 1;
    let yspeed = 3.3;

    window.requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        x = x + xspeed;
        y = y + yspeed;

        if (x < 50 || x > canvas.width - 50) {
            xspeed = xspeed * -1;
        }
        if (y < 50 || y > canvas.height - 50) {
            yspeed = yspeed * -1;
        }

        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fillStyle = "#ffdc00";
        ctx.fill();

        window.requestAnimationFrame(draw);
    }
}
