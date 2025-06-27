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
            <pre className="language-js" data-line="6,17">
                <code>{example1_7CodeBlock}</code>
            </pre>
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
            <h3>
                Example 1.8: Motion 101 (Velocity and Constant Acceleration)
            </h3>
            <canvas ref={example1_8Ref}></canvas>
            <pre className="language-js" data-line="9-10">
                <code>{example1_8CodeBlock}</code>
            </pre>
            <h3>Example 1.9: Motion 101 (Velocity and Random Acceleration)</h3>
            <canvas ref={example1_9Ref}></canvas>
            <pre className="language-js" data-line="7-8">
                <code>{example1_9CodeBlock}</code>
            </pre>
            <h3>Example 1.10: Accelerating Toward the Mouse</h3>
            <p>
                Anytime you want to calculate a vector based on a rule or
                foumula, you need to compute two attributes: magnitude and
                direction.
            </p>
            <p>
                In this example we know the acceleration vector should point
                from the object's position toward the mouse position.
            </p>
            <p>
                To set the magnitude of the acceleration vector, we first have
                to normalize the vector. If we first shrink it to its unit
                vector (of length 1), we can eaisly scale it to any other value.
            </p>
            <canvas ref={example1_10Ref}></canvas>
            <pre className="language-js">
                <code>{example1_10CodeBlock}</code>
            </pre>
        </div>
    );
};

class Mover {
    location: pTypes.Vector;
    velocity: pTypes.Vector;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(c: HTMLCanvasElement) {
        this.canvas = c;
        this.ctx = this.canvas.getContext("2d")!;
        this.location = p5.createVector(
            p5.random(this.canvas.width),
            p5.random(this.canvas.height)
        );
        this.velocity = p5.createVector(p5.random(-2, 2), p5.random(-2, 2));
    }

    update() {
        this.location.add(this.velocity);
    }

    display() {
        this.ctx.beginPath();
        this.ctx.arc(this.location.x, this.location.y, 16, 0, 360);
        this.ctx.fill();
    }

    checkEdges() {
        if (this.location.x > this.canvas.width) {
            this.location.x = 0;
        } else if (this.location.x < 0) {
            this.location.x = this.canvas.width;
        }

        if (this.location.y > this.canvas.height) {
            this.location.y = 0;
        } else if (this.location.y < 0) {
            this.location.y = this.canvas.height;
        }
    }
}

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

function example1_7(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let mover = new Mover(canvas);

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
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    class Mover1_8 extends Mover {
        acceleration: pTypes.Vector;
        topSpeed: number;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);
            this.location = p5.createVector(
                this.canvas.width / 2,
                this.canvas.height / 2
            );
            this.velocity = p5.createVector(0, 0);
            this.acceleration = p5.createVector(-0.001, 0.01);
            this.topSpeed = 8;
        }
        update() {
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.topSpeed);

            this.location.add(this.velocity);
        }
    }

    let mover = new Mover1_8(canvas);

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mover.checkEdges();
        mover.update();
        mover.display();
        requestAnimationFrame(draw);
    })();
}

function example1_9(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    class Mover1_9 extends Mover {
        acceleration: pTypes.Vector;
        topSpeed: number;

        constructor(c: HTMLCanvasElement) {
            super(c);
            this.location = p5.createVector(
                canvas.width / 2,
                canvas.height / 2
            );
            this.topSpeed = 3;
        }

        update() {
            this.acceleration = p5
                .createVector(p5.random(), p5.random())
                .normalize();
            this.acceleration.mult(p5.random(2));
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.topSpeed);
            this.location.add(this.velocity);
        }
    }

    let mover = new Mover1_9(canvas);

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mover.checkEdges();
        mover.update();
        mover.display();
        requestAnimationFrame(draw);
    })();
}

function example1_10(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let mouse = p5.createVector(0, 0);

    canvas.onmousemove = (e) => {
        mouse = getMousePosition(e);
    };

    class Mover1_10 extends Mover {
        acceleration: pTypes.Vector;
        topSpeed: number;

        constructor(c: HTMLCanvasElement) {
            super(c);
            this.location = p5.createVector(
                canvas.width / 2,
                canvas.height / 2
            );
            this.topSpeed = 5;
        }

        update() {
            let dir = mouse.copy().sub(this.location);
            dir.normalize();

            this.acceleration = dir;
            this.acceleration.mult(0.2);

            this.velocity.add(this.acceleration);
            this.velocity.limit(this.topSpeed);
            this.location.add(this.velocity);
        }
    }

    let mover = new Mover1_10(canvas);

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mover.update();
        mover.display();
        requestAnimationFrame(draw);
    })();
}

const example1_7CodeBlock = stripIndent`
class Mover {
    constructor(c: HTMLCanvasElement) {
        this.canvas = c;
        this.ctx = this.canvas.getContext("2d")!;

        // Setup data in the constructor
        this.location = p5.createVector(
            p5.random(this.canvas.width),
            p5.random(this.canvas.height)
        );
        this.velocity = p5.createVector(
            p5.random(-2, 2), 
            p5.random(-2, 2)
        );
    }

    // Functionality is implemented as methods
    update() {
        this.location.add(this.velocity);
    }

    display() {
        this.ctx.beginPath();
        this.ctx.arc(this.location.x, this.location.y, 16, 0, 360);
        this.ctx.fill();
    }

    checkEdges() {
        if (this.location.x > this.canvas.width) {
            this.location.x = 0;
        } else if (this.location.x < 0) {
            this.location.x = this.canvas.width;
        }

        if (this.location.y > this.canvas.height) {
            this.location.y = 0;
        } else if (this.location.y < 0) {
            this.location.y = this.canvas.height;
        }
    }
}
`;

const example1_8CodeBlock = stripIndent`
class Mover {
    constructor() {
        // ...previous declerations
        this.acceleration = p5.createVector(-0.001, 0.01);
        this.topSpeed = 8;
    }
    update() {
        this.velocity.add(this.acceleration);
        /** The limit() method redues the value of the vector
            if it goes over the set amount */
        this.velocity.limit(this.topSpeed);
        this.location.add(this.velocity);
    }
    // Same as before
    display() {}

    // Same as before
    checkEdges() {}
}
`;

const example1_9CodeBlock = stripIndent`
update() {
    this.acceleration = p5.createVector(
        p5.random(), 
        p5.random()
    ).normalize();

    /** Instead of initializing acceleration in the constructor,
       we randomly set its value inside the update() method. */
    this.acceleration.mult(p5.random(2));
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
}
`;

const example1_10CodeBlock = stripIndent`
// Getting mouse location is explained [here](https://lofiddle.com/get_mouse_position)

update() {
    // Step 1: Compute the direction.
    let dir = mouse
        .copy()
        .sub(this.location);

    // Step 2: Normalize.
    dir.normalize();

    // Step 3: Scale.
    dir.mult(0.2);

    // Step 4: Accelerate.
    this.acceleration = dir;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
}
`;
