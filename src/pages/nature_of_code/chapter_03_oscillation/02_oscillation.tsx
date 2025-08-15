import React, { useRef, useEffect } from "react";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO, p5 } from "../../../../constants";
import { stripIndent } from "common-tags";
import { Vector } from "p5";
import { a0 } from "react-router/dist/development/fog-of-war-BaM-ohjc";

export default () => {
    const example3_5Ref = useRef(null);
    const example3_6Ref = useRef(null);
    const example3_7Ref = useRef(null);
    const example3_8Ref = useRef(null);
    const example3_9Ref = useRef(null);

    useEffect(() => {
        example3_5(example3_5Ref.current!);
        example3_6(example3_6Ref.current!);
        example3_7(example3_7Ref.current!);
        example3_8(example3_8Ref.current!);
        example3_9(example3_9Ref.current!);
    });

    return (
        <div>
            <h1>Oscillation</h1>
            <p>
                The output of the sine function is a smooth curve alternating
                between -1 and 1, also known as a sine wave. This behavior, a
                periodic movement between two points, is known as an{" "}
                <b>oscillation</b>.
            </p>
            <p>
                In a programming sketch, we can simulate oscillation by
                assigning the output of the sine function to an object's
                position.
            </p>
            <p>
                This pattern of oscillationg back and forth around a central
                point is known as <b>simple harmonic motion</b>. The code to
                achieve it is remarkable simple. Before we write that code,
                however, here are some of the key terminology related to
                oscillation (and waves).
            </p>
            <p>
                When a moving object exhibits simple harmonic motion, its
                position (in this case, the x-position) can be expressed as a
                function of time, with the following two elements:
            </p>
            <ul>
                <li>
                    <b>Amplitude</b>: The distance from the center of motion to
                    either extreme
                </li>
                <li>
                    <b>Period</b>: The duration (time) for one complete cycle of
                    motion
                </li>
            </ul>
            <h3>Example 3.5: Simple harmonic Motion I</h3>
            <canvas ref={example3_5Ref}></canvas>
            <pre className="language-js" data-line="3-4,7,18">
                <code>
                    {stripIndent`
            let frameCount = 0;

            let period = 120;
            let amplitude = 200;

            function animate() {
                let x = amplitude * Math.sin((Math.PI * 2 * frameCount) / period);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);

                line(0, 0, x, 0);
                circle(x, 0, 36);

                ctx.restore();

                ++frameCount;
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
            `}
                </code>
            </pre>
            <h1>Oscillation with Angular Velocity</h1>
            <p>
                There is a slightly easier way to implement the simple harmonic
                motion from Example 3.5. The oscillation formula from before:
            </p>
            <pre className="language-js">
                <code>
                    let x = amplitude * Math.sin((Math.PI * 2) * frameCount /
                    period)
                </code>
            </pre>
            <p>We can rewrite in a slightly different way:</p>
            <pre className="language-js">
                <code>
                    let x = amplitude * sin(
                    <p>some value that increments slowly</p>)
                </code>
            </pre>
            <h3>Example 3.6: Simple Harmonic Motion II</h3>
            <canvas ref={example3_6Ref}></canvas>
            <pre className="language-js" data-line="1-3,6,18">
                <code>
                    {stripIndent`
                    let angle = 0;
                    let angleVelocity = 0.05;
                    let amplitude = 200;

                    function animate() {
                        let x = amplitude * Math.sin(angle);

                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        ctx.save();
                        ctx.translate(canvas.width / 2, canvas.height / 2);

                        line(0, 0, x, 0);
                        circle(x, 0, 36);

                        ctx.restore();

                        angle += angleVelocity;
                        requestAnimationFrame(animate);
                    }
                    requestAnimationFrame(animate);

                    `}
                </code>
            </pre>
            <p>
                To illustrate the power of thinking of oscillation in terms of
                angular velocity, lets expand the example a bit more.
            </p>
            <h3>Example 3.7: Oscillator Objects</h3>
            <canvas ref={example3_7Ref}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    class Oscillator {
                        constructor() {
                            this.angle = p5.createVector();
                            this.angleVelocity = p5.createVector(
                                p5.random(-0.05, 0.05),
                                p5.random(-0.05, 0.05)
                            );
                            this.amplitude = p5.createVector(
                                p5.random(20, canvas.width / 2),
                                p5.random(20, canvas.height / 2)
                            );
                        }

                        update() {
                            this.angle.add(this.angleVelocity);
                        }

                        display() {
                            let x = Math.sin(this.angle.x) * this.amplitude.x;

                            let y = Math.sin(this.angle.y) * this.amplitude.y;

                            ctx.save();
                            ctx.translate(canvas.width / 2, canvas.height / 2);

                            this.line(0, 0, x, y);
                            this.circle(x, y, 16);

                            ctx.restore();
                        }
                `}
                </code>
            </pre>
            <h1>Waves</h1>
            <h3>Example 3.8: Static Wave</h3>
            <canvas ref={example3_8Ref}></canvas>
            <pre className="language-js">
                <code>
                    {stripIndent`
                    let angle = 0;
                    let deltaAngle = 0.2;
                    let amplitude = 100;

                    for (let x = 0; x <= canvas.width; x += 24) {
                        let y = amplitude * Math.sin(angle);

                        circle(x, y + canvas.height / 2, 24);

                        angle += deltaAngle;
                    }
                `}
                </code>
            </pre>
            <h3>Example 3.9: The Wave</h3>
            <p>
                When drawing the entire sine wave as in Example 3.8, the same
                concepts of amplitude (the wave's height) and period (the wave's
                duration) come into play. However the term <em>period</em>{" "}
                shifts its meaning from representing time to describing the
                width (in pixels) of a full wave cycle. The term for the spatial
                period of a wave is <b>wavelength</b>-the distance a wave
                travels to complete one full oscillation cycle.
            </p>
            <p>
                Lets add motion to this wave and have it undulate. There will be
                a few differences.
            </p>
            <canvas ref={example3_9Ref}></canvas>
            <pre className="language-js" data-line="2,10,19">
                <code>
                    {stripIndent`
                    // A new variable to track the starting angle of the wave
                    let startAngle = 0;
                    let deltaAngle = 0.2;

                    function animate() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Each time through animate() the angle that increments
                        // is set to startAngle.
                        let angle = startAngle;

                        for (let x = 0; x <= canvas.width; x += 24) {
                            let y = p5.map(Math.sin(angle), -1, 1, 0, canvas.height);
                            circle(x, y, 24);
                            angle += deltaAngle;
                        }

                        // Increment the starting angle.
                        startAngle += 0.02;
                        requestAnimationFrame(animate);
                    }

                    animate();
                `}
                </code>
            </pre>
        </div>
    );
};

function example3_5(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let frameCount = 0;

    let period = 120;
    let amplitude = 200;

    function line(startX, startY, endX, endY) {
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    }

    function circle(x, y, radius) {
        ctx.fillStyle = "grey";

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    function animate() {
        let x = amplitude * Math.sin((Math.PI * 2 * frameCount) / period);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        line(0, 0, x, 0);
        circle(x, 0, 36);
        ctx.restore();

        ++frameCount;
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

function example3_6(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    function line(startX, startY, endX, endY) {
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    }

    function circle(x, y, radius) {
        ctx.fillStyle = "grey";

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    let angle = 0;
    let angleVelocity = 0.05;
    let amplitude = 200;

    function animate() {
        let x = amplitude * Math.sin(angle);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        line(0, 0, x, 0);
        circle(x, 0, 36);
        ctx.restore();

        angle += angleVelocity;
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}
function example3_7(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    class Oscillator {
        angle: Vector;
        angleVelocity: Vector;
        amplitude: Vector;

        constructor() {
            this.angle = p5.createVector();
            this.angleVelocity = p5.createVector(
                p5.random(-0.05, 0.05),
                p5.random(-0.05, 0.05)
            );
            this.amplitude = p5.createVector(
                p5.random(20, canvas.width / 2),
                p5.random(20, canvas.height / 2)
            );
        }

        update() {
            this.angle.add(this.angleVelocity);
        }

        display() {
            let x = Math.sin(this.angle.x) * this.amplitude.x;

            let y = Math.sin(this.angle.y) * this.amplitude.y;

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            this.line(0, 0, x, y);
            this.circle(x, y, 16);
            ctx.restore();
        }

        line(startX, startY, endX, endY) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.closePath();
        }

        circle(x, y, radius) {
            ctx.fillStyle = "grey";

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }

    const oscillators: Oscillator[] = [];
    for (let i = 0; i < 9; i++) {
        oscillators[i] = new Oscillator();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        oscillators.forEach((o) => {
            o.update();
            o.display();
        });

        requestAnimationFrame(animate);
    }

    animate();
}
function example3_8(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let angle = 0;
    let deltaAngle = 0.2;
    let amplitude = 100;

    function circle(x, y, radius) {
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 4;
        ctx.fillStyle = "grey";

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    for (let x = 0; x <= canvas.width; x += 24) {
        let y = amplitude * Math.sin(angle);

        circle(x, y + canvas.height / 2, 24);

        angle += deltaAngle;
    }
}

function example3_9(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    let startAngle = 0;
    let deltaAngle = 0.2;

    function circle(x, y, radius) {
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 4;
        ctx.fillStyle = "grey";

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let angle = startAngle;

        for (let x = 0; x <= canvas.width; x += 24) {
            let y = p5.map(Math.sin(angle), -1, 1, 0, canvas.height);
            circle(x, y, 24);
            angle += deltaAngle;
        }

        startAngle += 0.02;
        requestAnimationFrame(animate);
    }

    animate();
}
