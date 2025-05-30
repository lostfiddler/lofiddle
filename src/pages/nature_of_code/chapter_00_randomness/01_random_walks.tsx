import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prism-themes/themes/prism-dracula.css";
import { stripIndent } from "common-tags";
import {CANVAS_WIDTH} from '../../../../constants'

export function RandomWalks() {
    const canvasRef = useRef(null);

    useEffect(() => {
        Prism.highlightAll();
        CanvasApp(canvasRef.current!);
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

function CanvasApp(c: HTMLCanvasElement) {
    const canvas = c;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / 1.2

    let walker = new Walker(canvas);

    (function animate() {
        requestAnimationFrame(animate);
        walker.show();
        walker.step();
    })()
}

const kit = <div>katt</div>

class Walker {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }

    show() {
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(this.x, this.y, 1, 1);
    }

    step() {
        let choice = Math.floor(Math.random() * 4);

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
