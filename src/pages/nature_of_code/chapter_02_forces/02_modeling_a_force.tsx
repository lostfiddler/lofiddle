import React, { useRef, useEffect } from "react";
import katex from "katex";
import { Vector } from "p5";

import { p5, CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";
import { stripIndent } from "common-tags";
import { withRouter } from "react-router";

export default () => {
    const example2_4Ref = useRef(null);
    const example2_5Ref = useRef(null);
    const example2_6Ref = useRef(null);
    const example2_7Ref = useRef(null);

    useEffect(() => {
        example2_4(example2_4Ref.current!);
        example2_5(example2_5Ref.current!);
        example2_6(example2_6Ref.current!);
        example2_7(example2_7Ref.current!);
    });

    return (
        <div>
            <h1>Modeling Forces</h1>
            <p>
                There may be times when you come across an equation for a real
                life force and are wondering how to implement it in code. This{" "}
                <a href="https://natureofcode.com/forces/#parsing-formulas">
                    segment
                </a>{" "}
                in The Nature of Code will help out.
            </p>
            <h2>Friction</h2>
            <p>Lets begin with friction.</p>
            <span
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString("\\vec{f}= -\\mu N\\hat{v}"),
                }}
            />
            <p>
                The arrow above the{" "}
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("f"),
                    }}
                />{" "}
                indicates that friction is a vector, so we can separate this
                formula into two parts that determine the direction of friction
                as well as its magnitude.
            </p>
            <p>
                The part of the formula that says{" "}
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("-1 \\times \\hat{v}"),
                    }}
                />{" "}
                or -1 times the unit vector, indicates that{" "}
                <b>friction points in the opposite direction of velocity</b>. In
                our code this would mean taking an object's velocity vector and
                multiplying it by <code className="language-js">-1</code>:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    let friction = this.velocity.copy()
                    friction.normalize();

                    /** Lets figure out the direction of the friction force (a
                        unit vector in the opposite direction of velocity).*/
                    friction.mult(-1)`}
                </code>
            </pre>
            <p>
                According to the formula, the magnitude is{" "}
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("\\mu \\times N"),
                    }}
                />{" "}
                the Greek letter <em>mu</em> (
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("\\mu"),
                    }}
                />
                , pronunced <em>mew</em>) is used here to describe the
                coefficient of friction. The coefficient of friction{" "}
                <b>
                    establishes the strength of a friction force for a
                    particular surface.
                </b>
            </p>
            <p>
                Since we are dealing with a pretend world, we can arbitrarily
                set the coefficient to scale the strength of the friction:
            </p>
            <pre className="language-js">
                <code>{`let c = 0.01`}</code>
            </pre>
            <p>
                Now for the second part.{" "}
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("N"),
                    }}
                />{" "}
                refers to the <em>normal force</em>, the force perpendicular to
                the object's motion along a surface. Think of a vehicle driving
                along a road. The vehicle pushes down against the road with
                gravity, and Newton’s third law tells us that the road, in turn,
                pushes back against the vehicle. That’s the normal force. The
                greater the gravitational force, the greater the normal force.
            </p>
            <p>
                All of the specifics in reality are important, such as mass or
                the angle of the surface; however a "good enough" simulation can
                be achieved without them. We can for example, make friction work
                with the assumption that the normal force will always have a
                magnitude of 1.
            </p>
            <pre className="language-js">
                <code>{`let normal = 1;`}</code>
            </pre>
            <p>
                Now that we have the magnitude and direction for friction, we
                can put it all together in code:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    let c = 0.1;
                    let normal = 1;

                    /** Calculate the magnitude of friction(really just an
                        arbitrary constant) */
                    let frictionMag = c * normal;

                    let friction = mover.velocity.copy();
                    friction.mult(-1);
                    friction.normalize();

                    /** Take the unit vector and multiply it by the magnitude.
                        This is the force vector! */
                    friction.mult(frictionMag)`}
                </code>
            </pre>
            <p>
                This code calculates a friction force but dosen't answer the
                question of when to apply it. There's no answer since this is
                all a made-up world. But we can make the arbitrary, but logical,
                decision to apply friction when the circle comes into contact
                with the bottom of the canvas.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    contactEdge() {
                    /** the mover is touching the edge when it's within 1
                        pixel. */
                    return (this.positiony > height - this.radius -1);
                    }`}
                </code>
            </pre>
            <p>
                The bouncing off here simulates an idealized elastic collision,
                meaning no kinetic energy is lost when the circle and edge
                collide. A quick way to simulate an inelastic collision is to
                reduce the magnitude of velocity by a percentage with each
                boucne:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    checkEdges() {
                        /** A new variable to simulate an inelastic collision:
                            10% of the velocity's x- or y-component is lost */
                        let bounce = -0.9;

                        if (this.position.y > height - this.radius) {
                            this.position.y = height - this.radius;
                            this.velocity.y *= bounce;
                        }
                    }`}
                </code>
            </pre>
            <p>
                Finally, we can add all these pieces to the code from Example
                2.3 and simulate the object experiencing three forces: wind,
                gravity, and now friction.
            </p>
            <h3>Example 2.4: Including Friction</h3>
            <canvas ref={example2_4Ref}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        // implement friction equation
                        function friction(velocity) {
                            let c = 0.1;
                            let f = velocity.copy();
                            friction.mult(-1);
                            friction.setMag(c);
                            
                            return f
                        }

                        function animate() {
                            //...previous code from example 2.3

                            // Apply friction force vector to the object.
                            mover.applyForce(friction(mover.velocity))
                        }
                    `}
                </code>
            </pre>
            <h2>Air and Fluid Resistance</h2>
            <span
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        "\\vec{F}_d=-\\frac{1}{2}pv^2AC_d\\hat{v}"
                    ),
                }}
            />
            <p>
                Lets break down this equation and see whats really necessary for
                an effective simulation in code, making a simpler formula in the
                process:
            </p>
            <ul>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("\\vec{F}_d"),
                        }}
                    />{" "}
                    refers to <em>drag force</em>, the vector to compute.
                </li>
                <li>
                    -1/2 is a constant: -0.5. We can make up values for scaling
                    constants so this number is not too important, however the
                    fact that its negative is.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("\\rho"),
                        }}
                    />{" "}
                    is the Greek letter <em>rho</em>, another constant that
                    refers to the density of the liquid. We can choose to ignore
                    it and consider it to have a value of 1.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("v"),
                        }}
                    />{" "}
                    refers to the speed of the moving object.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("A"),
                        }}
                    />{" "}
                    refers to the frontal surface area of the object that's
                    pushing through the liquid gas.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("C_d"),
                        }}
                    />{" "}
                    is the coefficient of the drag. This constant will determine
                    the relative strength of the drag force.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("\\hat{v}"),
                        }}
                    />{" "}
                    is the velocity unit vector, found by normalizing the
                    vector.
                </li>
            </ul>
            <p>We can simplify and write the formula in code as such:</p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        let c = 0.1;
                        let speed = this.velocity.mag();

                        // Part 1 of the formula (magnitude)
                        let dragMagnitude = c * speed * speed;

                        let drag = this.velocity.copy

                        // Part 2 of the formula (direction)
                        drag.mult(-1);

                        // Magnitude and direction together!
                        drag.setMag(dragmagnitude);
                    `}
                </code>
            </pre>
            <p>
                Lets introduce a new element to the environment: a{" "}
                <code className="language-js">Liquid</code> object that exerts a
                drag force when the mover passes through it.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    class Liquid {
                        constructor(x, y, w, h, c) {
                            this.x = x;
                            this.y = y'
                            this.w = w;
                            this.h = h;

                            // Include a variable defining its coefficient of drag.
                            this.c = c;
                        }

                        display() {
                            ctx.fillRect(this.x, this.y, this.w, this.h)
                        }
                    }
                    `}
                </code>
            </pre>
            <p>
                Now how does the <code className="language-js">Mover</code>{" "}
                object talk to the <code className="language-js">Liquid</code>{" "}
                object:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    // If the liquid contains the mover, apply the drag force.
                    if (liquid.contains(mover)) {
                        let dragForce = liquid.calculateDrag(mover);
                        mover.applyForce(dragForce);
                    };
                    `}
                </code>
            </pre>
            <p>
                Now we need to implement the{" "}
                <code className="language-js">contains()</code> method that
                determines whether a <code className="language-js">Mover</code>{" "}
                object is inside the <code className="language-js">Liquid</code>{" "}
                object's area and a <code className="language-js">drag()</code>{" "}
                method that calculates and returns the appropriate drag force to
                be applied to the <code className="language-js">Mover</code>.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    contains(mover) {
                        let pos = mover.position;

                        return (pos.x > this.x && pos.x < this.x + this.w &&
                               pos.y > this.y && pos.y < this.y + this.h);
                    }
                    `}
                </code>
            </pre>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        calculateDrag(mover) {
                            let speed = mover.velocity.mag();

                            // Calculate the force's magnitude.
                            let dragMagnitude = this.c * speed * speed;

                            // Calculate the force's direction.
                            let dragForce = mover.velocity.copy();
                            dragForce.mult(-1);

                            //Finalize the force: set the magnitude and direction
                            dragForce.setMag(dragmagnitude);

                            return dragForce;
                        }
                    `}
                </code>
            </pre>
            <h3>Example 2.5: Fluid Resistance</h3>
            <canvas ref={example2_5Ref}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        const liquid = new Liquid(
                            canvas,
                            0,
                            canvas.height / 2,
                            canvas.width,
                            canvas.height,
                            0.1
                        );
                        const movers: Mover2_5[] = [];
                        for (let i = 0; i < 9; i++) {
                            movers[i] = new Mover2_5(
                                canvas,
                                i * (canvas.width / 10) + 60,
                                0,
                                p5.random(16)
                            );
                        }

                        function animate() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            liquid.display();

                            for (let i = 0; i < 9; i++) {

                                if (liquid.contains(movers[i])) {
                                    let dragForce = liquid.calculateDrag(movers[i]);
                                    movers[i].applyForce(dragForce);
                                }

                                movers[i].applyForce(forces.gravity(0.08));
                                movers[i].checkEdges();
                                movers[i].update();
                                movers[i].display();
                            }

                            requestAnimationFrame(animate);
                        }

                        animate();
                    `}
                </code>
            </pre>
            <h2>Gravitational Attraction</h2>
            <span
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        "\\vec{F}_g=\\frac{Gm_1m_2}{r^2}\\hat{r}"
                    ),
                }}
            />
            <p>Lets examine this formula a bit more closely:</p>
            <ul>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("\\vec{F}_g"),
                        }}
                    />{" "}
                    refers to the gravitational force, the vector to compute.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("G"),
                        }}
                    />{" "}
                    is the <em>universal gravitationa</em> constant, which in
                    our world equals{" "}
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString(
                                "6.67428 \\times 10^{-11}"
                            ),
                        }}
                    />{" "}
                    meters cubed per kilogram per second squared. For simplicity
                    we can just set it equal to 1 and ignore it for our made up
                    world.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("m_1\\text{ and }m_2"),
                        }}
                    />{" "}
                    are the masses of objects 1 and 2.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("\\hat{r}"),
                        }}
                    />{" "}
                    refers to the unit vector pointing from object 1 to object
                    2.
                </li>
                <li>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString("r^2"),
                        }}
                    />{" "}
                    is the distance between the two objects squared.
                </li>
            </ul>
            <p>
                Now lets translate this formula into code. We can make the
                following assumptions.
            </p>
            <ul>
                <li>There are two objects</li>
                <li>
                    Each object has a position:{" "}
                    <code className="language-js">position1</code> and{" "}
                    <code className="language-js">position2</code>.
                </li>
                <li>
                    each object has a mass:{" "}
                    <code className="language-js">mass1</code> and{" "}
                    <code className="language-js">mass2</code>.
                </li>
                <li>
                    The variable <code className="language-js">G</code>{" "}
                    represents the universal gravitational constant.
                </li>
            </ul>
            <p>
                We'll compute the vector in two parts. First, we'll compute the
                direction force (
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("\\hat{r}"),
                    }}
                />{" "}
                in the formula). Second we'll calculate the strength of the
                force according to the masses and distance.
            </p>
            <p>
                The direction of the attraction force that object 1 exerts on
                object 2 is equal to the following:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    let direction = position1.copy().sub(position2)
                    direction.normalize();
                    `}
                </code>
            </pre>
            <p>
                Now that we have the direction of the force, we need to compute
                its magnitude and scale the vector accordingly:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    let magnitude = (G * mass1 * mass2) / (distance * distance)
                    dir.mult(magnitude);
                    `}
                </code>
            </pre>
            <p>
                There is one problem, we do not know the distance. But wait, we
                just make a vector that points all the way from one object's
                position to the other.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    // The vector that points from one object to another
                    let force = position1.copy().sub(position2)

                    // The length (magnitude) of that vector is the distance
                    // between the two objects.
                    let distance = force.mag();

                    // Use the formula for gravity to compute the strength of
                    // the force.
                    let magnitude = (G * mass1 * mass2) / (distance * distance);

                    // Normalize and scale the force vector to the vector to the
                    // appropriated magnitude.
                    force.setMag(magnitude);
                    `}
                </code>
            </pre>
            <p>
                With these tweaks we've worked out the code for calculating an
                attractive force (emulating gravitational attraction). We can
                now turn our attention to applying this technique of an actual
                sketch.
            </p>
            <p>
                We will have a <code className="language-js">Mover</code> object
                that will experience a gravitational pull toward an{" "}
                <code className="language-js">Attractor</code> object.
            </p>
            <p>Lets create a basic Attractor class.</p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    class Attractor {{
                        constructor() {
                            /** The attractor is an object that doesn't move. It
                            needs just a mass and a position */
                            this.position = createVector(width / 2, height 2);
                            this.mass = 20;
                        }
                        display() {
                            this.ctx.fillStyle = "grey";
                            this.ctx.lineWidth = 4;

                            this.ctx.beginPath();
                            this.ctx.arc(
                                this.position.x,
                                this.position.y,
                                this.mass,
                                0,
                                360
                            );
                            this.ctx.stroke();
                            this.ctx.fill();
                        }
                    }}`}
                </code>
            </pre>
            <p>
                The last piece of the puzzle is getting one object to attract
                the other. How do these two objects communicate? This could be
                done in various ways but we will continue as such:
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        // Attraction force between two objects
                        let force = attractor.attract(mover);
                        
                        mover.applyForce(force);
                    `}
                </code>
            </pre>
            <p>
                Since we decided to pute the{" "}
                <code className="language-js">attract()</code> method inside the{" "}
                <code className="language-js">Attractor</code> class, we still
                need to actually write that method.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    attract(mover) {
                        let force = this.position.copy().sub(mover.position);
                        let distance = force.mag();

                        // Constrain the distance so the circle doesn't spin out
                        // of control
                        distance = constrain(distance, 5, 25)

                        let strength = (this.mass * mover.mass) / (distance * distance);
                        force.setMag(strength);

                        return force
                    }
                    `}
                </code>
            </pre>
            <h3>Example 2.6: Attraction</h3>
            <canvas ref={example2_6Ref}></canvas>
            <p>
                We could expand the code to include one{" "}
                <code className="language-js">Attractor</code> and an array of
                many <code className="language-js">Mover</code> objects.
            </p>
            <h3>Example 2.7: Attraction with Many Movers</h3>
            <canvas ref={example2_7Ref}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`  
                const attractor = new Attractor(canvas);
                let movers: Mover2_7[] = [];

                for (let i = 0; i < 9; i++) {
                    movers[i] = new Mover2_7(
                        canvas,
                        p5.random(canvas.width),
                        p5.random(canvas.height),
                        p5.random(0.5, 10)
                    );
                }

                function animate() {
                    attractor.display();
                    for (let i = 0; i < movers.length; i++) {
                        let force = attractor.attract(movers[i]);

                        movers[i].applyForce(force);
                        movers[i].update();
                        movers[i].display();
                    }

                    requestAnimationFrame(animate);
                }

                animate();
                `}
                </code>
            </pre>
        </div>
    );
};
class Mover {
    mass: number;
    size: number;
    location: Vector;
    velocity: Vector;
    acceleration: Vector;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(c: HTMLCanvasElement) {
        this.canvas = c;
        this.ctx = this.canvas.getContext("2d")!;

        this.mass = 2;
        this.size = 8;
        this.location = p5.createVector(this.canvas.width / 2 - 20, 50);
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
        this.ctx.arc(
            this.location.x,
            this.location.y,
            this.mass * this.size,
            0,
            360
        );
        this.ctx.stroke();
        this.ctx.fill();
    }

    applyForce(force: Vector) {
        let f = force.copy();

        f.div(this.mass);
        this.acceleration.add(f);
    }

    checkEdges() {
        let bounce = -0.9;

        if (this.location.x > this.canvas.width - this.size * this.mass) {
            this.location.x = this.canvas.width - this.size * this.mass;
            this.velocity.x *= bounce;
        } else if (this.location.x < 0 + this.size * this.mass) {
            this.location.x = 0 + this.size * this.mass;
            this.velocity.x *= bounce;
        }

        if (this.location.y > this.canvas.height - this.size * this.mass) {
            this.location.y = this.canvas.height - this.size * this.mass;
            this.velocity.y *= bounce;
        }
    }
}

class Mover2_5 extends Mover {
    constructor(c: HTMLCanvasElement, x: number, y: number, radius: number) {
        super(c);
        this.location = p5.createVector(x, y);
        this.size = radius;
    }
}

class Mover2_6 extends Mover {
    constructor(c: HTMLCanvasElement) {
        super(c);
        this.velocity = p5.createVector(1, 0);
    }
}

class Mover2_7 extends Mover {
    constructor(c: HTMLCanvasElement, x, y, radius) {
        super(c);
        this.location = p5.createVector(x, y);
        this.velocity = p5.createVector(2, 0);
        this.size = radius;
    }
}

class Liquid {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    w: number;
    h: number;
    c: number;

    constructor(canvas: HTMLCanvasElement, x, y, w, h, c) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")!;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    contains(mover: Mover2_5) {
        let loc = mover.location;

        return (
            loc.x > this.x &&
            loc.x < this.x + this.w &&
            loc.y > this.y &&
            loc.y < this.y + this.h
        );
    }

    calculateDrag(mover: Mover2_5) {
        let speed = mover.velocity.mag();

        let dragMagnitude = this.c * speed * speed;

        let dragForce = mover.velocity.copy();
        dragForce.mult(-1);

        dragForce.setMag(dragMagnitude);

        return dragForce;
    }

    display() {
        this.ctx.fillStyle = "lightgrey";
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Attractor {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    position: Vector;
    mass: number;

    constructor(c: HTMLCanvasElement) {
        this.canvas = c;
        this.ctx = c.getContext("2d")!;

        this.position = p5.createVector(
            this.canvas.width / 2,
            this.canvas.height / 2
        );
        this.mass = 20;
    }

    attract(mover: Mover) {
        let G = 1.0;
        let force = this.position.copy().sub(mover.location);
        let distance = force.mag();

        distance = p5.constrain(distance, 5, 25);

        let strength = (G * this.mass * mover.mass) / (distance * distance);
        force.setMag(strength);

        return force;
    }

    display() {
        this.ctx.fillStyle = "grey";
        this.ctx.lineWidth = 8;

        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.mass, 0, 360);
        this.ctx.stroke();
        this.ctx.fill();
    }
}

const forces = {
    gravity: (f: number) => {
        return p5.createVector(0, f);
    },
    wind: (f: number) => {
        return p5.createVector(f, 0);
    },
    friction: (c, moverVelocity) => {
        let friction = moverVelocity.copy();
        friction.mult(-1);
        friction.setMag(c);
        return friction;
    },
};

function example2_4(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = c.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const mover = new Mover(canvas);

    let mouseIsPressed = false;

    canvas.onmousedown = () => {
        mouseIsPressed = true;
    };

    canvas.onmouseup = () => {
        mouseIsPressed = false;
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        mover.applyForce(forces.gravity(0.08));
        if (mouseIsPressed) {
            mover.applyForce(forces.wind(0.05));
        }
        mover.applyForce(forces.friction(0.01, mover.velocity));

        mover.checkEdges();
        mover.update();
        mover.display();

        requestAnimationFrame(animate);
    }

    animate();
}
function example2_5(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = c.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const liquid = new Liquid(
        canvas,
        0,
        canvas.height / 2,
        canvas.width,
        canvas.height,
        0.1
    );
    const movers: Mover2_5[] = [];
    for (let i = 0; i < 9; i++) {
        movers[i] = new Mover2_5(
            canvas,
            i * (canvas.width / 10) + 60,
            0,
            p5.random(16)
        );
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        liquid.display();

        for (let i = 0; i < 9; i++) {

            if (liquid.contains(movers[i])) {
                let dragForce = liquid.calculateDrag(movers[i]);
                movers[i].applyForce(dragForce);
            }

            movers[i].applyForce(forces.gravity(0.08));
            movers[i].checkEdges();
            movers[i].update();
            movers[i].display();
        }

        requestAnimationFrame(animate);
    }

    animate();
}
function example2_6(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = c.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const mover = new Mover2_6(canvas);
    const attractor = new Attractor(canvas);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let force = attractor.attract(mover);
        mover.applyForce(force);
        mover.update();

        attractor.display();
        mover.display();

        requestAnimationFrame(animate);
    }

    animate();
}
function example2_7(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = c.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const attractor = new Attractor(canvas);
    let movers: Mover2_7[] = [];

    for (let i = 0; i < 9; i++) {
        movers[i] = new Mover2_7(
            canvas,
            p5.random(canvas.width),
            p5.random(canvas.height),
            p5.random(0.5, 10)
        );
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        attractor.display();
        for (let i = 0; i < movers.length; i++) {
            let force = attractor.attract(movers[i]);

            movers[i].applyForce(force);
            movers[i].update();
            movers[i].display();
        }

        requestAnimationFrame(animate);
    }

    animate();
}
