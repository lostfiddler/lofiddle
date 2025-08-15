import React, { useRef, useEffect } from "react";
import katex from "katex";
import { stripIndent } from "common-tags";

import { Vector } from "p5";
import { p5, CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";

export default () => {
    const example2_1Ref = useRef(null);
    const example2_2Ref = useRef(null);
    const example2_3Ref = useRef(null);

    useEffect(() => {
        example2_1(example2_1Ref.current!);
        example2_2(example2_2Ref.current!);
        example2_3(example2_3Ref.current!);
    });

    return (
        <div>
            <h1>Forces</h1>
            <p>
                The goal by the end of this chapter is to build a simple physics
                engine.
            </p>
            <p>
                A good place to start is to take a conceptual look at what it
                means to be a force in the real world as described by{" "}
                <a href="https://natureofcode.com/forces/#forces-and-newtons-laws-of-motion">
                    Sir Isaac Newton's three laws of motion{" "}
                </a>
                .
            </p>
            <p>
                The most important law for us as programmers is Newton's second
                law.
            </p>
            <span className="callout">
                Force equals mass times acceleration
            </span>
            <p>Or:</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        "\\vec{F} = M \\times \\vec{A}",
                        { throwOnError: false }
                    ),
                }}
            />
            <p>Written another way:</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString("\\vec{A} = \\vec{F}/M"),
                }}
            />
            <p>
                Acceleration is directly proportional to force and inversely
                proportionaly to mass.
            </p>
            <p>
                Given our <code className="language-js">Mover</code> class with
                position, velocity, and acceleration:
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    class Mover {
                        constuctor() {
                            this.position = createVector();
                            this.velocity = createVector();
                            this.acceleration = createVector();
                        }
                    }
                `}</code>
            </pre>
            <p>
                Our goal is to be able to add forces to this object, with code
                like this:
            </p>
            <pre className="language-js">
                <code>mover.applyForce(wind);</code>
            </pre>
            <p>Or like this:</p>
            <pre className="language-js">
                <code>mover.applyForce(gravity);</code>
            </pre>
            <p>
                Here <code className="language-js">wind</code> and{" "}
                <code className="language-js">gravity</code> are{" "}
                <code className="language-js">p5.Vector</code> objects. We could
                implement this <code className="language-js">applyForce()</code>
                as follows:
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    applyForce(force) {
                        // Newton's second law when mass equals 1
                        this.acceleration = force;
                    }
                `}</code>
            </pre>
            <p>
                This code has a problem though. Anytime{" "}
                <code className="language-js">applyForce()</code> is called,{" "}
                <code className="language-js">acceleration</code> is
                overwritten.
            </p>
            <h2>Force Accumulation</h2>
            <p>
                Our solution should be that forces must accumulate. or be added
                together.
            </p>
            <p>
                A revised <code className="language-js">applyForce()</code>{" "}
                method could look like this.
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    applyForce(force) {
                        // Newton's second law, but with force accumulation,
                        // adding all input forces to acceleration
                        this.acceleration.add(force);
                    }
                `}</code>
            </pre>
            <p>
                There is one more thing we must also take into account. When our
                force has finished acting on our object we must reset{" "}
                <code className="language-js">acceleration</code> to{" "}
                <code className="language-js">0</code>.
            </p>
            <p>
                One way to clear the acceleration for each frome is to multiply
                the <code className="language-js">acceleration</code> vector by{" "}
                <code className="language-js">0</code> at the end of{" "}
                <code className="language-js">update()</code>:
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    update(0) {
                        this.velocity.add(this.acceleration);
                        this.position.add(this.velocity);
                        // Clear acceleration after it's been applied.
                        this.acceleration.mult(0);
                    }
                `}</code>
            </pre>
            <h2>Factoring in Mass</h2>
            <p>First add mass to the object:</p>
            <pre className="language-js">
                <code>{stripIndent`
                    class Mover {
                        constructor() {
                            this.position = createVector();
                            this.velocity = createVector();
                            this.acceleration = createVector();
                            // Add mass as a number
                            this.mass = ????;
                        }
                    }
                `}</code>
            </pre>
            <p>
                Then according to Newtons second law we need to divide force by
                mass
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    applyForce(force) {
                        // Make copy of the vector before using it.
                        const f = force.copy();

                        // Newton's second law (with force accumulation and mass)
                        f.div(this.mass);
                        this.acceleration.add(f);
                    }
                `}</code>
            </pre>
            <h2>Creating Forces</h2>
            <p>
                The easiest way to make up a force is to just pick a number (or
                two numbers). Let's start with simulating wind.
            </p>
            <pre className="language-js">
                <code>{stripIndent`
                    let gravity = createVector(0, 0.1);
                    mover.applyForce(gravity);

                    if (mouseIsPressed) {
                        let wind = createVecor(0.01, 0);
                        mover.applyForce(wind);
                    }
                `}</code>
            </pre>
            <h3>Example 2.1: Forces</h3>
            <figure>
                <canvas ref={example2_1Ref}></canvas>
                <figcaption>
                    Clicking the mouse applies the wind force
                </figcaption>
            </figure>
            <pre
                className="language-js line-numbers"
                data-line="3,10,12,18,21,28-29,33-34,45-48"
            >
                <code>{example2_1CodeBlock}</code>
            </pre>
            <h3>Example 2.2: Forces Acting on Two Objects</h3>
            <canvas ref={example2_2Ref}></canvas>
            <pre className="language-js">
                <code>{example2_2CodeBlock}</code>
            </pre>
            <h3>Example 2.3: Gravity Scaled by Mass</h3>
            <canvas ref={example2_3Ref}></canvas>
            <pre className="language-js">
                <code>{example2_3CodeBlock}</code>
            </pre>
        </div>
    );
};

class Mover {
    mass: number;
    location: Vector;
    velocity: Vector;
    acceleration: Vector;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(c: HTMLCanvasElement) {
        this.canvas = c;
        this.ctx = this.canvas.getContext("2d")!;

        this.mass = 1;
        this.location = p5.createVector(this.canvas.width / 2, 25);
        this.velocity = p5.createVector(0, 0);
        this.acceleration = p5.createVector(0, 0);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    display() {
        this.ctx.fillStyle = "grey";
        this.ctx.lineWidth = 4;

        this.ctx.beginPath();
        this.ctx.arc(this.location.x, this.location.y, this.mass * 16, 0, 360);
        this.ctx.stroke();
        this.ctx.fill();
    }

    applyForce(force: Vector) {
        let f = force.copy();

        f.div(this.mass);
        this.acceleration.add(f);
    }

    checkEdges() {
        if (this.location.x > this.canvas.width) {
            this.location.x = this.canvas.width;
            this.velocity.x *= -1;
        } else if (this.location.x < 0) {
            this.velocity.x *= -1;
            this.location.x = 0;
        }

        if (this.location.y > this.canvas.height) {
            this.velocity.y *= -1;
            this.location.y = this.canvas.height;
        }
    }
}

class Mover2_2 extends Mover {
    constructor(c: HTMLCanvasElement, mass, x, y) {
        super(c)
        this.mass = mass;
        this.location = p5.createVector(x, y);
    }
}

function example2_1(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let gravity = p5.createVector(0, 0.1);
    let mover = new Mover(canvas);

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (p5.mouseIsPressed) {
            let wind = p5.createVector(0.1, 0);
            mover.applyForce(wind);
        }

        mover.applyForce(gravity);
        mover.update();
        mover.display();
        mover.checkEdges();

        requestAnimationFrame(draw);
    })();
}

function example2_2(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const moverA = new Mover2_2(canvas, 4, canvas.width * 0.3, canvas.height * 0.3);
    const moverB = new Mover2_2(canvas, 1, canvas.width * 0.7, canvas.height * 0.3);

    let gravity = p5.createVector(0, 0.1);


    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if(p5.mouseIsPressed) {
            let wind = p5.createVector(0.1, 0);
            moverA.applyForce(wind);
            moverB.applyForce(wind);
        }
        moverA.applyForce(gravity);
        moverB.applyForce(gravity);
        moverA.update();
        moverB.update();
        moverA.display();
        moverB.display();
        moverA.checkEdges();
        moverB.checkEdges();

        requestAnimationFrame(draw)
    })()
}

function example2_3(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const moverA = new Mover2_2(canvas, 4, canvas.width * 0.3, canvas.height * 0.3);
    const moverB = new Mover2_2(canvas, 1, canvas.width * 0.7, canvas.height * 0.3);

    let gravity = p5.createVector(0, 0.1);
    let gravityA = gravity.copy().mult(moverA.mass);
    let gravityB = gravity.copy().mult(moverB.mass);


    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if(p5.mouseIsPressed) {
            let wind = p5.createVector(0.1, 0);
            moverA.applyForce(wind);
            moverB.applyForce(wind);
        }
        moverA.applyForce(gravityA);
        moverB.applyForce(gravityB);
        moverA.update();
        moverB.update();
        moverA.display();
        moverB.display();
        moverA.checkEdges();
        moverB.checkEdges();

        requestAnimationFrame(draw)
    })()

}

const example2_1CodeBlock = stripIndent`
class Mover {
  constructor() {
    // For now, set the mass equal to 1 for simplicity.
    this.mass = 1;
    this.position = createVector(width / 2, 30);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  // Newton’s second law
  applyForce(force) {
    // Receive a force, divide by mass, and add to acceleration.
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    // Motion 101 from Chapter 1
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // Now add clearing the acceleration each time!
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    fill(175);
    // Scale the size according to mass. Stay tuned for an
    // improvement on this to come later in the chapter!
    circle(this.position.x, this.position.y, this.mass * 16);
  }

  // Somewhat arbitrarily, I’ve decided that an object bounces 
  // when it hits the edges of the canvas.
  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }

    if (this.position.y > height) {
    // Even though I said not to touch position and velocity 
    // directly, exceptions exist. Here, I’m doing so as a 
    // quick way to reverse the direction of the object 
    // when it reaches the edge.
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
}
`;

const example2_2CodeBlock = stripIndent`
// Make up a gravity force and apply it
let gravity = createVector(0, 0.1);
moverA.applyForce(gravity);
moverB.applyForce(gravity);

// Make up a wind force and apply it when the mouse is clicked.
if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
}
`;

const example2_3CodeBlock = stripIndent`
// Made-up gravity force
let gravity = createVector(0, 0.1);
// Scale by mover A’s mass.
let gravityA = p5.Vector.mult(gravity, moverA.mass);
moverA.applyForce(gravityA);
// Scale by mover B’s mass.
let gravityB = p5.Vector.mult(gravity, moverB.mass);
moverB.applyForce(gravityB);
`;
