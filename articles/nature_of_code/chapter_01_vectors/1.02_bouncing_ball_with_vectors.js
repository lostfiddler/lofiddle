export default () => {
    const main = document.querySelector('main');
    const canvas = document.createElement("canvas");
    canvas.width = 1066;
    canvas.height = 600;
    main.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let arc_location = [width / 2, height / 2]
    let velocity = [1, 3.3]

    window.requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // FIXME - what is add?
        arc_location = add(arc_location, velocity);
        if (arc_location[0] < 50 || arc_location[0] > width - 50) {
            velocity[0] = velocity[0] * -1;
        }
        if (arc_location[1] < 50 || arc_location[1] > height - 50) {
            velocity[1] = velocity[1] * -1;
        }

        ctx.beginPath();
        ctx.arc(arc_location[0], arc_location[1], 50, 0, 360);
        ctx.fill();

        window.requestAnimationFrame(draw);
    }
}
