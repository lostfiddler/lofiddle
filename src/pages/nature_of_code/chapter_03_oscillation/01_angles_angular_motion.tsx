import React, { useRef, useEffect } from "react";
import katex from "katex";
import { stripIndent } from "common-tags";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO, p5 } from "../../../../constants";
import { Vector } from "p5";

export default () => {
    const example3_1Ref = useRef(null);
    const example3_2Ref = useRef(null);
    const example3_3Ref = useRef(null);
    const example3_4Ref = useRef(null);

    useEffect(() => {
        example3_1(example3_1Ref.current!);
        example3_2(example3_2Ref.current!);
        example3_3(example3_3Ref.current!);
        example3_4(example3_4Ref.current!);
    });

    return (
        <div>
            <p>
                <b>Oscillation</b>, or the back-and-forth movement of an object
                around a central point or position, is a fundamental aspect of
                motion in the natural world.
            </p>
            <p>
                To model oscillation, we need to understand a little bit about
                trigonometry, the mathematics of triangles.
            </p>
            <p>
                This chapter is all about learning how to spin objects as they
                move, use the sine and cosine functions to model nice ease-in,
                ease-out wave patterns, and learn to calculate the more complex
                forces at play in situations that involve angles, such as a
                pendulum swinging or a box sliding down an incline.
            </p>
            <h1>Angles</h1>
            <p>
                While degrees can be useful (and more familiar to most of us),{" "}
                <b>radians</b> are the standard unit of measurement across many
                programming languages and graphics environments.
            </p>
            <p>The formula to convert from degrees to radians is as follows:</p>
            <span
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        "\\text{radians}=\\frac{2\\pi\\times\\text{degrees}}{360}"
                    ),
                }}
            />
            <p>
                Thankfully the library I am using has a convenience function{" "}
                <code className="language-js">radians()</code> to convert values
                from degrees to radians.
            </p>
            <pre className="language-js">
                <code>
                    {stripIndent`
                let angle = 60;
                console.log(radians(angle)) // 1.0471975511965976
                `}
                </code>
            </pre>
            <h1>Angular Motion</h1>
            <p>
                Another term for rotation is angular motion-that is, motion
                about an angle. Just as linear motion can be described in terms
                of velocity, angular motion can be described in terms of{" "}
                <b>angular velocity</b>. And by extension we can describe an
                objects <b>angular acceleration</b>.
            </p>
            <p>
                Luckily we can apply exactly the same logic from chapters 1 and
                2 to a rotating object. In fact angular motion is simpler that
                its linear motion counterparts sice and here is a{" "}
                <em>scalar</em> quantity, not a vector! This is because in 2D
                space, there's one axis of rotation; in 3D space, the angle
                would become a vector.
            </p>
            <h3>Example 3.1: Angular Motion Using rotate()</h3>
            <canvas ref={example3_1Ref}></canvas>
            <pre className="language-js" data-line="1-3,10,18,19">
                <code>
                    {stripIndent`

                    let angle = 0;
                    let angleVelocity = 0;
                    let angleAcceleration = 0.0001;

                    function animate() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        ctx.save();
                        ctx.translate(canvas.width / 2 + lineWidth, canvas.height / 2);
                        ctx.rotate(angle);

                        line();
                        circle1();
                        circle2();

                        ctx.restore();

                        angleVelocity += angleAcceleration;
                        angle += angleVelocity;

                        requestAnimationFrame(animate);
                    }

                    animate();
                `}
                </code>
            </pre>
            <p>
                The logical next step is to incorporate this idea of angular
                motion into the <code className="language-js">Mover</code>{" "}
                class.
            </p>
            <pre className="language-js" data-line="9-11">
                <code>
                    {stripIndent`
                class Mover {
                    constructor() {
                        this.position = createVector();
                        this.velocity = createVector();
                        this.acceleration = createVector();
                        this.mass = 1.0;

                        // Variables for angular motion
                        this.angle = 0;
                        this.angularVelocity = 0;
                        this.angularAcceleration = 0;
                    }
                }
                `}
                </code>
            </pre>
            <pre className="language-js line-numbers" data-line="8-9">
                <code>
                    {stripIndent`
                    update() {
                        // Regular old-fashioned motion
                        this.velocity.add(this.acceleration);
                        this.position.add(this.velocity);


                        // Newfangled angular motion
                        this.angularVelocity.add(this.angularAcceleration);
                        this.angle += this.angularVelocity;

                        this.acceleration.mult(0);
                    }
                `}
                </code>
            </pre>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    display() {
                        ctx.save();
                        
                        // Set the origin at the shapes position.
                        ctx.translate(this.position.x, this.position.y);

                        // Rotate by the angle
                        ctx.rotate(this.angle);

                        circle(0, 0, this.radius * 2);
                        line(0, 0, this.radius, 0);

                        // Restore the previous state ofter rotation is complete.
                        ctx.restore()
                    }
                    `}
                </code>
            </pre>
            <h3>Example 3.2: Forces with (Arbitrary) Angular Motion</h3>
            <canvas ref={example3_2Ref}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        update() {
                            this.velocity.add(this.acceleration);
                            this.position.add(this.velocity);

                            // Calculate angular acceleration according to
                            // acceleration's x-component.
                            this.angleAcceleration = this.acceleration.x / 10.0;
                            this.angleVelocity += this.angleAcceleration;

                            // Constrain angular velocity so it dosen't spin out
                            // of control
                            this.angleVelocity = constrain(this.angleVelocity, -0.1, 0.1);

                            this.angle += this.angleVelocity;
                            this.acceleration.mult(0);
                        }
                    `}
                </code>
            </pre>
            <h1>Trigonometry Functions</h1>
            <p>
                The secret of trigonometry, and the foundation for much of
                computer graphics work, is...wait for it... <em>sohcahtoa</em>!
                This mnemonic device references the sides of a right triangle.
            </p>
            <img src="./src/assets/images/Figure3.4.png" width={CANVAS_WIDTH} />
            <ul>
                <li>
                    <b>soh: s</b>ine(angle) = <b>o</b>pposite/<b>h</b>
                    ypotenuse{" "}
                </li>
                <li>
                    <b>cah: c</b>osine(angle) = <b>a</b>djacent/<b>h</b>
                    ypotenuse
                </li>
                <li>
                    <b>toa: t</b>angent(angle) = <b>o</b>pposite/<b>a</b>djacent
                </li>
            </ul>
            <p>
                Now lets try to look at the triangle in a slightly different
                way.
            </p>

            <p style={{ overflow: "hidden" }}>
                <img
                    src="./src/assets/images/Figure3.5.png"
                    width="300px"
                    style={{ float: "right", marginLeft: "0.2rem" }}
                />
                See how a right triangle is created from the vector{" "}
                <span
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString("\\hat{v}"),
                    }}
                />
                . Viewed in this way, the trigonometric functions establish a
                relationship between the components of a vector, its direction +
                magnitude. Using the <em>toa</em> in <em>sohcahtoa</em>, we can
                write the relationship as follows:
                <span
                    style={{ display: "block" }}
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString(
                            "\\text{tangent(angle)}=\\frac{\\text{velocity}_y}{\\text{velocity}_x}"
                        ),
                    }}
                />
            </p>
            <p>
                The problem here is that while I know the x- and y-components of
                the velocity vector, we don't know the angle of its direction.
                We have to solve for that angle. This is where another function
                known as the <em>inverse tangent</em>, or <em>arc-tangent</em>,
                comes in.
            </p>
            <p>
                If the tangent of value <em>a</em> equals value <em>b</em>, then
                the inverse tangent of <em>b</em> equals <em>a</em>. So:
            </p>
            <table>
                <tbody>
                    <tr>
                        <td>if</td>
                        <td>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(
                                        "\\text{tan}(a)=b"
                                    ),
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>then</td>
                        <td>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(
                                        "a=\\text{arctan}(b)"
                                    ),
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>
                Really one is just the inverse of the other. This allows for us
                to solve for the vector's angle
            </p>
            <table>
                <tbody>
                    <tr>
                        <td>if</td>
                        <td>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(
                                        "\\text{tan}(\\text{angle})=\\frac{\\text{velocity}_y}{\\text{velocity}_x}"
                                    ),
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>then</td>
                        <td>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(
                                        "\\text{angle}=\\text{arctan}(\\frac{\\text{velocity}_y}{\\text{velocity}_x})"
                                    ),
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3>Example 3.3: Pointing in the Direction of Motion</h3>
            <canvas ref={example3_3Ref}></canvas>
            <pre className="language-js" data-line="2-3,7">
                <code>
                    {stripIndent`
                        show() {
                            // Use atan2() to account for all possible directions.
                            let angle = atan2(this.velocity.y, this.velocity.x)

                            ctx.save();
                            ctx.translate(this.position.x, this.position.y);
                            ctx.rotate(angle);
                            ctx.fillRect(0, 0, 30, 10);
                            ctx.restore;
                        }
                    `}
                </code>
            </pre>
            <h1>Polar vs. Cartesian Coordinates</h1>
            <p>
                <b>Polar coordinates</b>, describes a point in space as a
                distance from the origin (like the radius of a circle) and an
                angle of rotation around the origin (usually called θ, the Greek
                letter theta). Thinking in terms of vectors, a Cartesian
                coordinate describes a vector’s x- and y-components, whereas a
                polar coordinate describes a vector’s magnitude (length) and
                direction (angle).
            </p>
            <p>
                When programming sketches that involve rotational or circular
                movements, it may be more convenient to think in polar
                coordinates. However the graphics library we may be working with
                may only understand Cartesian coordinates. Happily, trigonometry
                holds the key to converting back and forth between polar and
                Cartesian.
            </p>
            <img width={CANVAS_WIDTH} src="./src/assets/images/Figure3.9.png" />
            <p>
                For example, given a polar coordinate with a radius of 75 pixels
                and an angle (θ) of 45 degrees (or π/4), the Cartesian{" "}
                <em>x</em> and <em>y</em> can be computed as follows:
            </p>
            <div
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        "\\text{cos}(\\theta)=x/r\\Rarr x=r\\times\\text{cos}(\\theta)"
                    ),
                }}
            />
            <div
                style={{ marginTop: "1rem" }}
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        "\\text{sin}(\\theta)=y/r\\Rarr y=r\\times\\text{sin}(\\theta)"
                    ),
                }}
            />
            <h3>Example 3.4: Polar to Cartesian</h3>
            <canvas ref={example3_4Ref}></canvas>
            <pre className="language-js" data-line="1-2,11-12,19">
            <code>
            {stripIndent`
                let r = canvas.height * 0.45;
                let theta = 0;

                function animate() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    ctx.save();

                    ctx.translate(canvas.width / 2, canvas.height / 2);

                    let x = r * Math.cos(theta);
                    let y = r * Math.sin(theta);

                    line(x, y);
                    circle(x, y);

                    ctx.restore();

                    theta += 0.02;

                    requestAnimationFrame(animate);
                }

                animate();
                `}
                </code>
            </pre>
        </div>
    );
};

function example3_1(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let lineWidth = 4;

    function line() {
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(-50, 0);
        ctx.lineTo(50, 0);
        ctx.closePath();
        ctx.stroke();
    }

    function circle1() {
        ctx.beginPath();
        ctx.arc(-50, 0, 8, 0, 360);
        ctx.closePath();
        ctx.fill();
    }

    function circle2() {
        ctx.beginPath();
        ctx.arc(50, 0, 8, 0, 360);
        ctx.closePath();
        ctx.fill();
    }

    let angle = 0;
    let angleVelocity = 0;
    let angleAcceleration = 0.0001;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2 + lineWidth, canvas.height / 2);
        ctx.rotate(angle);

        line();
        circle1();
        circle2();

        ctx.restore();

        angleVelocity += angleAcceleration;
        angle += angleVelocity;

        requestAnimationFrame(animate);
    }

    animate();
}
function example3_2(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    class Mover {
        position: Vector;
        velocity: Vector;
        acceleration: Vector;
        mass: number;
        radius: number;
        angle: number;
        angleVelocity: number;
        angleAcceleration: number;

        constructor(radius: number) {
            this.position = p5.createVector(
                p5.random(canvas.width),
                p5.random(canvas.height)
            );
            this.velocity = p5.createVector(1, 0);
            this.acceleration = p5.createVector(0, 0);
            this.mass = 1;
            this.radius = radius;
            this.angle = 0;
            this.angleVelocity = 0;
            this.angleAcceleration = 0;
        }

        update() {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);

            this.angleAcceleration = this.acceleration.x / 10.0;
            this.angleVelocity += this.angleAcceleration;
            this.angleVelocity = p5.constrain(this.angleVelocity, -0.1, 0.1);

            this.angle += this.angleVelocity;

            this.acceleration.mult(0);
        }

        applyForce(force: Vector) {
            const f = force.copy();

            f.div(this.mass);
            this.acceleration.add(f);
        }

        display() {
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.angle);
            this.circle();
            this.line();
            ctx.restore();
        }

        circle() {
            ctx.lineWidth = 4;
            ctx.fillStyle = "grey";

            ctx.beginPath();
            ctx.arc(0, 0, this.radius * this.mass, 0, 360);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }

        line() {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(this.radius, 0);
            ctx.stroke();
            ctx.closePath();
        }
    }

    class Attractor {
        position: Vector;
        mass: number;

        constructor() {
            this.position = p5.createVector(
                canvas.width / 2,
                canvas.height / 2
            );
            this.mass = 20;
        }

        attract(mover: Mover) {
            let force = this.position.copy().sub(mover.position);
            let distance = force.mag();

            distance = p5.constrain(distance, 5, 25);

            let strength = (this.mass * mover.mass) / (distance * distance);
            force.setMag(strength);

            return force;
        }

        display() {
            ctx.fillStyle = "grey";
            ctx.lineWidth = 6;

            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.mass, 0, 360);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }

    const mover = new Mover(p5.random(2, 16));
    const attractor = new Attractor();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        attractor.display();

        let attractionForce = attractor.attract(mover);
        mover.applyForce(attractionForce);

        mover.update();
        mover.display();

        requestAnimationFrame(animate);
    }

    animate();
}

function example3_3(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let mousePosition: { x: number | null; y: number | null } = {
        x: null,
        y: null,
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

        return [x, y];
    }

    class Mover {
        position: Vector;
        velocity: Vector;
        acceleration: Vector;
        topSpeed: number;
        angle: number;
        angleVelocity: number;
        angleAcceleration: number;

        constructor() {
            this.position = p5.createVector(0, 0);
            this.velocity = p5.createVector(1, 1);
            this.acceleration = p5.createVector(0, 0);
            this.topSpeed = 4;
            this.angle = 0;
            this.angleVelocity = 0;
            this.angleAcceleration = 0;
        }

        update() {
            const mouse = p5.createVector(mousePosition.x!, mousePosition.y!);

            let dir = mouse.copy().sub(this.position);

            dir.normalize();
            dir.mult(0.2);

            this.acceleration = dir;

            this.velocity.add(this.acceleration);
            this.velocity.limit(this.topSpeed);
            this.position.add(this.velocity);
        }

        display() {
            let angle = Math.atan2(this.velocity.y, this.velocity.x);

            ctx.save();
            ctx.translate(this.position.x - 15, this.position.y - 0);
            ctx.rotate(angle);
            ctx.fillRect(0, 0, 30, 10);
            ctx.restore();
        }
    }

    const mover = new Mover();

    canvas.onmousemove = (e) => {
        [mousePosition.x, mousePosition.y] = getMousePosition(e);
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        mover.update();
        mover.display();
        requestAnimationFrame(animate);
    }

    animate();
}
function example3_4(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let r = canvas.height * 0.45;
    let theta = 0;

    function line(x, y) {
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
    }

    function circle(x, y) {
        ctx.fillStyle = 'grey';
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);

        let x = r * Math.cos(theta);
        let y = r * Math.sin(theta);

        line(x, y);
        circle(x, y);

        ctx.restore();

        theta += 0.02;

        requestAnimationFrame(animate);
    }

    animate();
}
