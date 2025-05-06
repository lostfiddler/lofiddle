import React, { useRef, useEffect } from "react";
import p5 from "p5";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prism-themes/themes/prism-dracula.css";
import figure0_8 from '../../../images/figure0-8.png'
import { resize } from "../../misc/utils.js";

export function PerlinNoise() {
    const perlinGraphRef = useRef(null);
    const uniformGraphRef = useRef(null);

    useEffect(() => {
        Prism.highlightAll();
        perlinGraph(perlinGraphRef.current!);
        uniformGraph(uniformGraphRef.current!);
    }, []);

    return (
        <div>
            <h1>A Smoother Approach With Perlin Noise</h1>
            <p>
                A good random number generator produces numbers that have no
                relationship to one another and show no discernible patter.
                However, while a litle bit of randomness can be a good thing
                when programming organic, lifelike behaviours, uniform
                randomness as the single guiding principle isn't necesssarily
                natural. An algorithm known as <b>Perlin noise</b>, takes this
                concept into account by producing a naturally ordered sequence
                of pseudorandom numbers, where each number in the sequence is
                quite close in value to the one before it. This creates a
                "smooth" transition between the random numbers and a more
                organic apperance than pure noise, making Perlin noise well
                suited for generating various effects with natural qualities,
                such as clouds, landscapes, and patterned textures like marble.
            </p>
            <p>
                The two graphs bellow illustrates the difference between Perlin
                noise and uniform randomness. The first graph shows Perlin
                noise over time; note the smoothness of the curve. The second
                graph shows noise in the form of purely random numbers over
                time; the result is much more jagged.
            </p>
            <canvas ref={perlinGraphRef}></canvas>
            <canvas ref={uniformGraphRef}></canvas>
            <p>
                The p5.js library includes a function called
                <code className="language-js">noise()</code> which generates smooth
                random values. The <code className="language-js">noise()</code>{" "}
                function can take one, two, or three arguments, as noise is
                computed in one, two, or three dimensions. Usage of the p5's
                <code className="language-js">noise()</code> function is a bit
                different from the standard{" "}
                <code className="language-js">Math.random()</code> where you
                multiply the value by the maximum.{" "}
                <code className="language-js">noise()</code> doesn't work this way.
                Instead, its output range is fixed: it always returns a value
                from 0 to 1.
            </p>
            <p>
                One-dimensional Perlin noise can be thought of as a linear
                sequence of values over time. For example:
            </p>
            <table>
                <thead>
                    <th scope="col">Time</th>
                    <th scope="col">Noise Value</th>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">0</th>
                        <td scope="row">0.365</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td scope="row">0.363</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td scope="row">0.363</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td scope="row">0.364</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td scope="row">0.366</td>
                    </tr>
                </tbody>
            </table>
            <p>
                To access a particular noise value, you have to choose a
                "moment in time" and pass it the{" "}
                <code className="language-js">noise()</code> function. For example:
            </p>
            <pre>
                <code className="language-js">{codeBlock00}</code>
            </pre>
            <p>
                According to the preceding table,{" "}
                <code className="language-js">noise(3)</code> returns 0.364. The
                next step is to use a variable for time and ask for a noise
                value continuously in your animation loop:
            </p>
            <pre>
                <code className="language-js">{codeBlock01}</code>
            </pre>
            <p>
                The same logic can be applied to the random walker, assigning
                both its x- and y-values according to Perlin noise This creates
                a smoother, more organic random walk.
            </p>
            <h2>Two-Dimensional Noise</h2>
            <p>
                With 1D noise, there's a sequence of values in which any given
                value is similar to its neighbor. Because these values live in
                one dimension, each has only two neighbors: a value that comes
                before it and one that comes after it.
            </p>
            <p>
                Two-dimensional noise works exactly the same way conceptually.
                The difference is that values dont reside on a linear path but
                rather on a plane. A given value will be similar to all its
                neighbors: above, below, to the right, to the left, and along
                any diagonal.
            </p>
            <img src={figure0_8} width="500" />
            <p>
                If you were to visualize this graph paper with each value
                mapped to the brightness of a color, you would get something
                that looks like clouds.
            </p>
            <p>
                This effect is why noise was originally invented. If you tweak
                the parameters and play with color, the resulting images look
                more like, marble, wood, or any other organic texture.
            </p>
        </div>
    );
}

const codeBlock00 = `let n = noise(3);`;
const codeBlock01 = `let t = 3;

fuction animate() {
    // You need the noise falue for a specific moment in time.
    let n = noise(t);
    console.log(n);
    // Dont forget to move forward in time!
    t += 0.01;
}`;

function perlinGraph(c: HTMLCanvasElement) {
    // TODO buffer grows indeffinetly, need to fix
    // TODO second call to kitten() causes animation to lag, need fix
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    const p = new p5((instance: p5) => {
        instance.setup = () => {
            instance.noCanvas();
        };
    });

    let x = 0;
    let t = 0;
    let i = 0;
    let buffer = kitten();

    p.noiseSeed(21);

    // reduce pixelation

    // initial frame
    ctx.drawImage(buffer[0], 0, 0, canvas.width, canvas.height);

    function draw() {
        requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        carousel();
    }

    function carousel() {
        if (x < -canvas.width) {
            i++;
            x = 0;
            buffer.push(...kitten());
        }
        ctx.drawImage(buffer[i], x--, 0, canvas.width, canvas.height);
        ctx.drawImage(
            buffer[i + 1],
            x + canvas.width - 5,
            0,
            canvas.width,
            canvas.height
        );
    }

    function kitten() {
        const a: HTMLCanvasElement[] = [];

        for (let i = 0; i < 2; i++) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;
            resize(canvas);

            ctx.strokeStyle = "red";
            ctx.beginPath();
            for (let x1 = 0; x1 < canvas.width; x1++) {
                ctx.lineTo(x1++, p.noise((t += 0.01)) * canvas.height);
                ctx.stroke();
            }
            a.push(canvas);
        }
        return a;
    }

    draw();

    return canvas;
}

function uniformGraph(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;
    let x = 0;

    resize(canvas);

    ctx.beginPath();
    function draw() {
        requestAnimationFrame(draw);
        ctx.lineTo(x++, Math.random() * canvas.height);
        ctx.stroke();
    }

    draw();

    return canvas;
}
