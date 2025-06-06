import React, { useRef, useEffect } from "react";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";

export function RandomNumberDistribution() {
    const canvasRef = useRef(null);

    function canvasApp() {
        const canvas = canvasRef.current! as HTMLCanvasElement;
        const ctx = canvas.getContext("2d")!;

        canvas.width = CANVAS_WIDTH;
        canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

        let randomCounts = [];
        let total = 20;

        for (let i = 0; i < total; i++) {
            randomCounts[i] = 0;
        }

        function draw() {
            requestAnimationFrame(draw);
            let index = Math.floor(Math.random() * randomCounts.length);
            randomCounts[index]++;

            ctx.strokeStyle = "red";
            ctx.fillStyle = "grey";
            let w = canvas.width / randomCounts.length;
            for (let x = 0; x < randomCounts.length; x++) {
                ctx.fillRect(
                    x * w,
                    canvas.height - randomCounts[x],
                    w - 1,
                    randomCounts[x]
                );
                ctx.strokeRect(
                    x * w,
                    canvas.height - randomCounts[x],
                    w - 1,
                    randomCounts[x]
                );
            }
        }

        draw();

        return canvas;
    }

    useEffect(() => {canvasApp()});


    return (
        <div>
            <h1>A Random Number Distribution</h1>
            <canvas ref={canvasRef}></canvas>
            <p>
                The Math.random() functon produces a uniform randomness which
                sometimes isn't the behaviour we are looking for. With a few
                tricks, however, the Math.random() function can instead produce
                nonuniform-distributions of random numbers, where some outcomes
                are more likely than others. This type of distribution can
                yield more interesting, seemingly natural results.
            </p>
        </div>
    )
}
