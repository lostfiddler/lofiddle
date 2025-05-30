import React, {useRef, useEffect} from 'react';

export default () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasApp(canvasRef.current!)
    })
    return (
        <div>
            <h1>A Bouncing Ball with No Vectors</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

function canvasApp(canvasRef: HTMLCanvasElement) {
    const canvas = canvasRef;
    canvas.width = 500;
    canvas.height = 300;
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

        if (x < 25 || x > canvas.width - 25) {
            xspeed = xspeed * -1;
        }
        if (y < 25 || y > canvas.height - 25) {
            yspeed = yspeed * -1;
        }

        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fillStyle = "#ffdc00";
        ctx.fill();

        window.requestAnimationFrame(draw);
    }
    return canvas;
}
