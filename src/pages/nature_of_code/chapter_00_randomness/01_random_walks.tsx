import React, { useEffect, useRef } from "react";
import { stripIndent } from "common-tags";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";

interface State {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    paused: boolean;
    walker: Walker | null;
}

const state: State = {
    canvas: null,
    ctx: null,
    paused: false,
    walker: null,
};

class Walker {
    position: { x: number; y: number };

    constructor() {
        this.position = {
            x: state.canvas!.width / 2,
            y: state.canvas!.height / 2,
        };
    }

    show() {
        const ctx = state.ctx!;

        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x, this.position.y, 1, 1);
    }

    step() {
        let choice = Math.floor(Math.random() * 4);

        if (choice === 0) {
            this.position.x++;
        } else if (choice === 1) {
            this.position.x--;
        } else if (choice === 2) {
            this.position.y++;
        } else {
            this.position.y--;
        }
    }
}

function CanvasApp() {
    let walker = state.walker!;

    (function animate() {
        requestAnimationFrame(animate);
        if (state.paused) {
            return;
        }

        walker.show();
        walker.step();
    })();
}

function Controls() {
    function pause(e: React.MouseEvent<HTMLButtonElement>) {
        state.paused = !state.paused;
        const target = e.target as HTMLButtonElement
        target.innerText = state.paused ? "play" : "pause";
    }

    function restart() {
        const canvas = state.canvas!;
        const ctx = state.ctx!;
        const walker = state.walker!;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        walker.position = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };
        console.log(walker.position);
    }

    return (
        <div>
            <button onClick={pause}>pause</button>
            <button onClick={restart}>restart</button>
        </div>
    );
}

export function RandomWalks() {
    const canvasRef = useRef(null);

    useEffect(() => {
        state.canvas = canvasRef.current;
        state.canvas!.width = CANVAS_WIDTH;
        state.canvas!.height = state.canvas!.width / CANVAS_WIDTH_RATIO;
        state.ctx = state.canvas!.getContext("2d");
        state.walker = new Walker();

        CanvasApp();
    }, []);

    return (
        <div>
            <h1>Random Walks</h1>
            <p>
                The JavaScript function{" "}
                <code className="language-js">Math.random()</code> returns a
                random number between 0 and 1.
            </p>
            <canvas ref={canvasRef} />
            <Controls />
            <h3>Entity Class</h3>
            <pre>
                <code className="language-js">{WalkerClass}</code>
            </pre>
            <h3>Animation loop</h3>
            <pre>
                <code className="language-js">{DrawFunction}</code>
            </pre>
        </div>
    );
}

const WalkerClass = stripIndent`
    class Walker {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
        }

        show () {
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.x, this.y, 1, 1)
        }

        step() {
            let choice = Math.floor(Math.random() * 4)

            if (choice === 0) {
                this.x++;
            } else if (choice === 1) {
                this.x--;
            } else if (choice === 2) {
                this.y++;
            } else {
                this.y--;
            }
        }
    }`.replace(/^\n/, "");

const DrawFunction = stripIndent`
    function animate() {
        requestAnimationFrame(animate)
        walker.show();
        walker.step();
    }
    `.replace(/^\n/, "");
