import React, { useRef, useEffect } from "react";
import { stripIndent } from "common-tags";
import {p5, CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";

export default () => {
    const canvasExample1_1Ref = useRef(null);
    const canvasExample1_2Ref = useRef(null);

    useEffect(() => {
        const canvasExample1_1 = canvasExample1_1Ref.current!;
        const canvasExample1_2 = canvasExample1_2Ref.current!;

        example1_1(canvasExample1_1);
        example1_2(canvasExample1_2);
    });
    return (
        <div>
            <h1>The Point of Vectors</h1>
            <p>
                Why should I care about vectors? To illustrate, here is an
                example of a simple bouncing ball without vectors.
            </p>
            <h3>Example 1.1: A Bouncing Ball with No Vectors</h3>
            <canvas ref={canvasExample1_1Ref}></canvas>
            <pre className="language-js">
                <code>{Example1_1CodeBlock}</code>
            </pre>
            <p>
                In this example the ball has properties like position and speed
                that are represented in the code as variables:
            </p>
            <table>
                <tbody>
                    <tr>
                        <th>Property</th>
                        <th>Variable Names</th>
                    </tr>
                    <tr>
                        <td>Position</td>
                        <td>
                            <code className="language-js">x</code> and{" "}
                            <code className="language-js">y</code>
                        </td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>
                            <code className="language-js">xspeed</code> and{" "}
                            <code className="language-js">yspeed</code>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>
                In a more sophisticated sketch, there may be many more varibles
                representing other properties of the ball and its environment.
            </p>
            <table>
                <tbody>
                    <tr>
                        <th>Property</th>
                        <th>Variable Names</th>
                    </tr>
                    <tr>
                        <td>Acceleration</td>
                        <td>
                            <code className="language-js">xacceleration</code>{" "}
                            and{" "}
                            <code className="language-js">yacceleration</code>
                        </td>
                    </tr>
                    <tr>
                        <td>Target position</td>
                        <td>
                            <code className="language-js">xtarget</code> and{" "}
                            <code className="language-js">ytarget</code>
                        </td>
                    </tr>
                    <tr>
                        <td>Wind</td>
                        <td>
                            <code className="language-js">xwind</code> and{" "}
                            <code className="language-js">ywind</code>
                        </td>
                    </tr>
                    <tr>
                        <td>Friction</td>
                        <td>
                            <code className="language-js">xfriction</code> and{" "}
                            <code className="language-js">yfriction</code>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>
                Notice that for every concept (wind, friction, etc..), there are
                two variables. And this is only a 2D world. In a
                three-dimensional world, we'll need three variables for each
                property: <code className="language-js">x</code>,{" "}
                <code className="language-js">y</code>, and{" "}
                <code className="language-js">z</code> for position;{" "}
                <code className="language-js">xspeed</code>,{" "}
                <code className="language-js">yspeed</code>, and{" "}
                <code className="language-js">zspeed</code> for speed; and so
                on. It would be nice to simplify the code to use fewer
                variables, so instead of starting a program with something like
                this
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    let x;
                    let y;
                    let xspeed;
                    let yspeed;`}</code>
            </pre>
            <p>we could start it with something like this:</p>
            <pre className="language-js">
                <code>{stripIndent`
                    let position;
                    let speed;`}</code>
            </pre>
            <p>
                Thinking of the ball's properties as vectors instead of a lose
                collection of seperate values allows for us to do just that.
            </p>
            <h2>Vectors</h2>
            <p>
                A vector can be thought of as the difference between two points,
                or as directions to find the shortest path from one point to
                another.
            </p>
            <p>
                Lets treat position and velocity as vectors instead, each
                represented by an object with{" "}
                <code className="language-js">x</code> and{" "}
                <code className="language-js">y</code> attributes. If we were to
                write a <code className="language-js">Vector</code> class, we
                could start with something like this:
            </p>
            <pre className="language-js">
                <code className="language-js">
                    {stripIndent`
                    class Vector  {
                        constructor(x, y) {
                            this.x = x;
                            this.y = y:
                        }
                    }`}
                </code>
            </pre>
            <p>
                This class is designed to store the same data as before-two
                numbers per vector, an <code className="language-js">x</code>{" "}
                and a <code className="language-js">y</code> value. At its core,
                a <code className="language-js">Vector</code> object is just a
                convenient way to store two values (or three in a 3D universe)
                under one name.
            </p>
            <p>
                Many graphics/physics libraries already include a built-in class
                for representing vectors, such as p5.js's{" "}
                <code className="language-js">p5.Vector</code> so we dont have
                to write one ourselves. And so this
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                let x = 100;
                let y = 100;
                let xspeed = 1;
                let yspeed = 3.3:`}</code>
            </pre>
            <p>becomes this:</p>
            <pre className="language-js">
                <code>{stripIndent`
                let position = createVector(100, 100);
                let velocity = createVector(1, 3.3);`}</code>
            </pre>
            <p>
                Now lets implement the vector-based algorithm for motion:{" "}
                <b>position = position + velocity</b>. In Example 1.1, without
                vectors, the code reads as follows:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    x = x + xspeed;
                    y = y + yspeed;`}
                </code>
            </pre>
            <p>
                In an ideal world, we would be able to rewrite this as shown
                here:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    position = position + velocity;
                `}
                </code>
            </pre>
            <p>
                JavaScript, however does not know how to add two{" "}
                <code className="language-js">p5.Vector</code> objects together.
            </p>
            <h2>Vector Addition</h2>
            <p>
                Before moving on, check out this explanation of the theory
                behind{" "}
                <a href="https://natureofcode.com/vectors/#vector-addition">
                    vector addition
                </a>
                .
            </p>
            <p>
                Now lets modify our <code className="language-js">Vector</code>{" "}
                class with a method called{" "}
                <code className="language-js">add()</code> that takes another{" "}
                <code className="language-js">Vector</code> object as its
                argument:
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                class Vector {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                    }

                    // New! A function to add another vector to this vector.
                    add(v) {
                        this.x = this.x + v.x;
                        this.y = this.y + v.y;
                    }
                }`}</code>
            </pre>
            <p>Now lets rewrite the bouncing ball example with vectors.</p>
            <h3>Example 1.2: Bouncing Ball with Vectors</h3>
            <canvas ref={canvasExample1_2Ref}></canvas>
            <pre className="language-js">
                <code>{Example1_2CodeBlock}</code>
            </pre>
            <p>
                The benefit of using vectors may not be immediately apparent in
                this example but I have no doubt that in more a more complex
                universe, with multiple objects and multiple forces acting on
                these objects, vectors will drastically help with organization
                and reasoning.
            </p>
        </div>
    );
};

function example1_1(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

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

function example1_2(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const position = p5.createVector(100, 100);
    const velocity = p5.createVector(2.5, 2);

    (function draw() {
        requestAnimationFrame(draw);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw ball
        {
            ctx.fillStyle = "hotpink";
            ctx.beginPath();
            ctx.arc(position.x, position.y, 25, 0, Math.PI * 2);
            ctx.fill();
        }
        // check for bounds
        {
            if (position.x < 25 || position.x > canvas.width - 25) {
                velocity.x = velocity.x * -1;
            }
            if (position.y < 25 || position.y > canvas.height - 25) {
                velocity.y = velocity.y * -1;
            }
        }
        // update variables
        {
            position.add(velocity);
        }
    })();
}

const Example1_1CodeBlock = stripIndent`
// Variables for position and speed of ball
let x = canvas.width / 2;
let y = canvas.height / 2;
let xspeed = 1;
let yspeed = 3.3;

// Move the ball according to its speed
x = x + xspeed;
y = y + yspeed;

// Check for bouncing.
if (x < 25 || x > canvas.width - 25) {
    xspeed = xspeed * -1;
}
if (y < 25 || y > canvas.height - 25) {
    yspeed = yspeed * -1;
}

// Draw the ball at the position (x,y)
ctx.beginPath();
ctx.arc(x, y, 25, 0, Math.PI * 2);
ctx.fillStyle = "#ffdc00";
ctx.fill();
`;

const Example1_2CodeBlock = stripIndent`
// Instead of a bunch of floats, there are just two variables.
const position = p5.createVector(100, 100);
const velocity = p5.createVector(2.5, 2);

(function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw ball
    {
        ctx.fillStyle = "hotpink";
        ctx.beginPath();
        ctx.arc(position.x, position.y, 25, 0, Math.PI * 2);
        ctx.fill();
    }
    // check for bounds
    {
        if (position.x < 25 || position.x > canvas.width - 25) {
            velocity.x = velocity.x * -1;
        }
        if (position.y < 25 || position.y > canvas.height - 25) {
            velocity.y = velocity.y * -1;
        }
    }
    // update variables
    {
        position.add(velocity)
    }
})();
`;
