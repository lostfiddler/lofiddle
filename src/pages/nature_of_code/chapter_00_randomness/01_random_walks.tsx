import React, {useEffect, useRef} from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prism-themes/themes/prism-dracula.css';
import {stripIndent} from 'common-tags';

export function RandomWalks() {
    const canvasRef = useRef(null);
    useEffect(() => {
        Prism.highlightAll();
        CanvasApp();
    }, [])

    function CanvasApp() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.parentElement.getBoundingClientRect().width;
        canvas.height = canvas.width / 1.2;

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
        }

        let walker = new Walker()

        function draw() {
            requestAnimationFrame(draw)
            walker.show();
            walker.step();
        }

        draw()
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
    }`.replace(/^\n/, '');

    const DrawFunction = stripIndent`
    function draw() {
        requestAnimationFrame(draw)
        walker.show();
        walker.step();
    }
    `.replace(/^\n/, '');

    return (
        <>
            <div>
                <h1 className="title">Random Walks</h1>
                <p>The JavaScript function <code className="language-js">Math.random()
                </code> returns a random number between 0 and 1.</p>
                <canvas ref={canvasRef} />
                <h3>Walker Class</h3>
                <pre><code className="language-js">{WalkerClass}</code></pre>
                <h3>Draw Function</h3>
                <pre><code className="language-js">{DrawFunction}</code></pre>
            </div>
        </>
    )
}
