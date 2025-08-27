import React, { useRef, useEffect, useState } from "react";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../constants";

export default () => {
    const [loaded, setLoaded] = useState(false);
    const canvasRef = useRef(null);
    const archerSpriteSheet = document.createElement("img");
    archerSpriteSheet.src = "./src/assets/images/Archer_Blue.png";

    useEffect(() => {
        archerSpriteSheet.onload = (e) => {
            setLoaded(true);
        };

        if (loaded) {
            app(canvasRef.current!, archerSpriteSheet);
        }
    }, [loaded]);

    return (
        <div>
            <h1>Archer</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

function app(c: HTMLCanvasElement, a: HTMLImageElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    class Archer {
        cycle: number;
        sWidth: number;
        sHeight: number;
        state: string;
        states = {
            idle: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
            ],
            running: [
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
                [4, 1],
                [5, 1],
            ],
            shootUp: [
                [0, 2],
                [1, 2],
                [2, 2],
                [3, 2],
                [4, 2],
                [5, 2],
                [6, 2],
                [7, 2],
            ],
            shootDiagonalUp: [
                [0, 3],
                [1, 3],
                [2, 3],
                [3, 3],
                [4, 3],
                [5, 3],
                [6, 3],
                [7, 3],
            ],
            shootFront: [
                [0, 4],
                [1, 4],
                [2, 4],
                [3, 4],
                [4, 4],
                [5, 4],
                [6, 4],
                [7, 4],
            ],
            shootDiagonalDown: [
                [0, 5],
                [1, 5],
                [2, 5],
                [3, 5],
                [4, 5],
                [5, 5],
                [6, 5],
                [7, 5],
            ],
            shootDown: [
                [0, 6],
                [1, 6],
                [2, 6],
                [3, 6],
                [4, 6],
                [5, 6],
                [6, 6],
                [7, 6],
            ],
        };

        constructor() {
            this.state = "shootDown";
            this.cycle = 0;
            this.sWidth = 192;
            this.sHeight = 192;
        }

        display() {
            ctx.drawImage(
                a,
                this.sWidth * this.states[this.state][this.cycle][0],
                this.sHeight * this.states[this.state][this.cycle][1],
                this.sWidth,
                this.sHeight,
                canvas.width / 2 - 192 / 2,
                canvas.height / 2 - 192 / 2,
                192,
                192
            );
            this.cycle = (this.cycle + 1) % this.states[this.state].length;
        }
    }

    const archer = new Archer();

    let fpsInterval: number;
    let startTime: number;
    let now: number;
    let then: number;
    let elapsed: number;

    startAnimating(10);

    function startAnimating(fps: number) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            archer.display();
        }
    }
}
