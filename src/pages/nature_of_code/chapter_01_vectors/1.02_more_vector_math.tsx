import React, { useRef, useEffect } from "react";
import {Vector} from 'p5';

import { p5, CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";

interface State {
    mouse: Vector;
}

const state: State = {
    mouse: p5.createVector(p5.mouseX, p5.mouseY),
};

export default () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        example1_3(canvasRef.current!);
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
            <h2>Vector Subtraction</h2>
            <canvas ref={canvasRef}></canvas>
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

    state.mouse.x = x;
    state.mouse.y = y;
}

function example1_3(c: HTMLCanvasElement) {
    const canvas = c;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const ctx = canvas.getContext("2d")!;

    let origin = { x: canvas.width / 2, y: canvas.height / 2 };

    canvas.onmousemove = getMousePosition;

    window.requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(state.mouse.x!, state.mouse.y!);
        ctx.closePath();
        ctx.stroke();

        window.requestAnimationFrame(draw);
    }
    return canvas;
}
