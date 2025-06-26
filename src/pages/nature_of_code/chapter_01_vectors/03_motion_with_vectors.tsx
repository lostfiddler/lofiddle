import React, { useRef, useEffect } from "react";
import { p5 as pTypes } from "p5";
import { stripIndent } from "common-tags";

import { p5, CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants.js";

export default () => {
    const example1_7Ref = useRef(null);
    const example1_8Ref = useRef(null);
    const example1_9Ref = useRef(null);
    const example1_10Ref = useRef(null);

    useEffect(() => {
        example1_7(example1_7Ref.current!);
        example1_8(example1_8Ref.current!);
        example1_9(example1_9Ref.current!);
        example1_10(example1_10Ref.current!);
    });

    return (
        <div>
            <h1>Vector, Motion & Velocity</h1>
            <p>Essentially, these steps are Motion 101:</p>
            <ol>
                <li>Add the velocity to the position.</li>
                <li>Draw the object at the position.</li>
            </ol>
            <p>
                From here on I will generally like to encapsulate all the logic
                for an object's motion inside a class.
            </p>
            <h3>Example 1.7: Motion 101 (Velocity)</h3>
            <canvas ref={example1_7Ref}></canvas>
            <p>
                Thanks to the source material I (and whoever may be reading
                this!) am feeling pretty comfortable with (1) what a vector is
                and (2) how to use vectors inside and object to keep track of
                its position and movement.
            </p>
            <h2>Acceleration</h2>
            <p>
                <b>Acceleration</b> is the rate of change of velocity. In
                earlier examples velocity was defined as the rate of change in
                position. Take note of this pattern as it is a useful one even
                in more complex applications. In code this trickle down effect
                reads like this:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    velocity.add(acceleration)
                    position.add(velocity)`}
                </code>
            </pre>
            <p>
                Threre are many possible ways to calculate acceleration. Here
                are a few algorithms:
            </p>
            <ul>
                <li>A constant acceleration</li>
                <li>A random acceleration</li>
                <li>An acceleration toward the mouse</li>
            </ul>
            <h3>Example 1.8: Motion 101 (Velocity and Constant Acceleration)</h3>
            <canvas ref={example1_8Ref}></canvas>
            <h3>Example 1.9: Motion 101 (Velocity and Random Acceleration)</h3>
            <canvas ref={example1_9Ref}></canvas>
            <h3>Example 1.10: Accelerating Toward the Mouse</h3>
            <canvas ref={example1_10Ref}></canvas>
        </div>
    );
};

function example1_7(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    class Mover {
        location: pTypes.Vector;
        velocity: pTypes.Vector;

        constructor() {
            this.location = p5.createVector(
                p5.random(canvas.width),
                p5.random(canvas.height)
            );
            this.velocity = p5.createVector(p5.random(-2, 2), p5.random(-2, 2));
        }

        update() {
            this.location.add(this.velocity);
        }

        display() {
            ctx.beginPath();
            ctx.arc(this.location.x, this.location.y, 16, 0, 360);
            ctx.fill();
        }

        checkEdges() {
            if (this.location.x > canvas.width) {
                this.location.x = 0;
            } else if (this.location.x < 0) {
                this.location.x = canvas.width;
            }

            if (this.location.y > canvas.height) {
                this.location.y = 0;
            } else if (this.location.y < 0) {
                this.location.y = canvas.height;
            }
        }
    }

    let mover = new Mover();

    window.requestAnimationFrame(animate);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mover.update();
        mover.display();
        mover.checkEdges();
        window.requestAnimationFrame(animate);
    }
    return canvas;
}

function example1_8(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext('2d');

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;
}

function example1_9(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext('2d');
}

function example1_10(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext('2d');
}
