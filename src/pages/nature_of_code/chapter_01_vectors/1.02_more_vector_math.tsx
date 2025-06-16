import React, { useRef, useEffect } from "react";

import { p5, CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";

export default () => {
    const canvasRefExample1_3 = useRef(null);
    const canvasRefExample1_4 = useRef(null);

    useEffect(() => {
        example1_3(canvasRefExample1_3.current!);
        example1_4(canvasRefExample1_4.current!);
    });

    return (
        <div>
            <h1>More Vector Math</h1>
            <p>
                Adition is really just the first step. Many mathematical
                operations are commonly used with vectors. Here's a{" "}
                <a href="https://natureofcode.com/vectors/#more-vector-math">
                    comprehensive table
                </a>{" "}
                of the operations available as methods in the{" "}
                <code className="language-js">p5.Vector</code> class.
            </p>
            <p>Lets go through a few of the key methods.</p>
            <h3>Example 1.3: Vector Subtraction</h3>
            <p>
                <span className="tag-danger">Note</span> this example kinda
                blows, need fix
            </p>
            <canvas ref={canvasRefExample1_3}></canvas>
            <h3>Example 1.4: Multiplying a Vector</h3>
            <canvas ref={canvasRefExample1_4}></canvas>
        </div>
    );
};

function getMousePosition(e: MouseEvent) {
    let x: number;
    let y: number;

    const target = e.target! as HTMLCanvasElement;

    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y =
            e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= target.offsetLeft;
    y -= target.offsetTop;

    return p5.createVector(x, y);
}

function example1_3(c: HTMLCanvasElement) {
    const canvas = c;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const ctx = canvas.getContext("2d")!;

    let origin = { x: canvas.width / 2, y: canvas.height / 2 };
    let mouse = p5.createVector(0,0);

    canvas.onmousemove = (e) => {
        mouse = getMousePosition(e);
    }

    window.requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(origin.x, origin.y);
            ctx.stroke();
        }

        {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        {
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
        }

        window.requestAnimationFrame(draw);
    }
    return canvas;
}

function example1_4(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let center = p5.createVector(canvas.width / 2, canvas.height / 2);
    let mouse = p5.createVector(0, 0);

    canvas.onmousemove = (e) => {
        mouse = getMousePosition(e);
        mouse.sub(center)
        mouse.mult(0.5)
    }

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
        }

        {

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        {
            ctx.lineWidth = 5;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.restore();
        }

        requestAnimationFrame(draw);
    })();
}
