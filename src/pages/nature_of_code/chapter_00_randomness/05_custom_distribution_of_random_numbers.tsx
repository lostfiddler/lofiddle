import React, { useRef, useEffect } from "react";

import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";
import figure from "#assets/images/figure0-3.png";

export function CustomDistribution() {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasApp(canvasRef.current!);
    });
    return (
        <div>
            <h1>A Custom Distribution of Random Numbers</h1>
            <p>
                A problem that appears when using a uniform distribution of
                random numbers and even a gaussian one in simulations is a
                phenomenon known as <b>oversampling</b>. This problem can be
                observed in our previous walker examples where the walkers
                return to previously visited positions many times.
            </p>
            <p>
                One strategy to avoid such a problem is to take a very large
                step every so often. This allows the walker to forage randomly
                aroud a specific position while peridically jmping far away to
                reduce the amount of oversampling. This variation on the random
                walk, known as a <b>Lévy flight</b>, requires a custom set of
                probabilities. For example(though not an exact implementation
                of a Lévy flight) you could stte the probability distribution
                as follows: the longer the step, the less likely it is to be
                picked; the shorter the step, the more likely.
            </p>
            <p>
                One way to implement a Lévy flight might be to specify a 1
                percent chance of the walker taking a large step:
            </p>
            <pre>
                <code className="language-js">{codeExample00}</code>
            </pre>
            <p>
                However, this reduces the probabilities to a fixed number of
                options: 99 percent of the time, a small step; 1 percent of the
                time, a large step. What if we wanted to make a more{" "}
                <i>general rule</i>, such as the higher a number, the more
                likely it is to be picked.
            </p>
            <img src={figure} width="500" />
            <p>
                If a distribution of random numbers can be generated according
                to the graph above, we should also be able to generate a random
                distribution that follows any other curve you can define with a
                formula.
            </p>
            <p>
                One solution for a custom distribution is to pick two random
                numbers instead of one. The first random number is just that,
                the second one, however, is what is called a{" "}
                <b>qualifying random value</b>. This value is used by the
                program to decide whether to use that first number or throw it
                away and pick another. Numbers that have an easier time
                qualifying will be picked more often v. those that rarely
                qualify.
            </p>
            <p>
                This process is called the <b>accept-reject algoritm</b>, a
                type of Monte Carlo method. The following example features a
                function that implements the accept-reject algoritm, returning
                a random value from 0 to 1.
            </p>
            <h3>Example: An Accept-Reject Distribution</h3>
            <canvas ref={canvasRef}></canvas>
            <pre>
                <code className="language-js">{codeExample01}</code>
            </pre>
            <p>
                While the accept-reject algorithm does work for generating
                custom distributions of random numbers, this technique is not
                particular efficient. It can lead to a considerable amout of
                wasted computation when a large number of random values are
                rejected, especially when the qualifying probility is very low.
                A different, more optimal approach will be disscused later
                (chapter 9).
            </p>
        </div>
    );
}

const codeExample00 = `let r = random(1);
// A 1% chance of taking a large step
if (r < 0.01) {
    xstep = random(-100, 100);
    ystep = random(-100, 100);
} else {
    xstep = random(-1, 1);
    ystep = random(-1, 1);
}`;

const codeExample01 = `function acceptReject() {
    while(true) {
        let r1 = Math.random(1);
        let probability = r1;
        let r2 = Math.random(1);

        if (r2 < probability) {
            return r1;
        }
    }
}`;

function canvasApp(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const randomCounts: number[] = [];

    for (let i = 0; i < 20; i++) {
        randomCounts[i] = 0;
    }

    (function draw() {
        requestAnimationFrame(draw);
        randomCounts[Math.floor(acceptReject() * 20)]++;

        ctx.fillStyle = "red";
        for (let i = 0; i < randomCounts.length; i++) {
            ctx.fillRect(
                (canvas.width / randomCounts.length) * i,
                canvas.height,
                canvas.width / 20,
                -randomCounts[i]
            );
            ctx.strokeRect(
                (canvas.width / randomCounts.length) * i,
                canvas.height,
                canvas.width / 20,
                -randomCounts[i]
            );
        }
    })();

    function acceptReject() {
        while (true) {
            let r1 = Math.random() * 1;
            let probability = r1;
            let r2 = Math.random() * 1;

            if (r2 < probability) {
                return r1;
            }
        }
    }

    return canvas;
}
