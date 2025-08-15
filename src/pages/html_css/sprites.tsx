import React, { useRef, useEffect } from "react";
import { stripIndent } from "common-tags";

import "./sprites.css";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../constants";

export default () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasApp(canvasRef.current!);
    }, []);

    return (
        <div>
            <h1>Sprites & Keyframe Animation</h1>
            <h2>Animating with CSS</h2>
            <div style={{ margin: "2.5rem 0" }}>
                <div className="box">fiddle</div>
            </div>
            <pre className="language-css">
                <code>{blockCodeBlock}</code>
            </pre>
            <h3>Dynamic Keyframe Animations</h3>
            <div style={{ margin: "4rem 0 2rem 0" }}>
                <div className="circle one"></div>
                <div className="circle two"></div>
                <div className="circle three"></div>
            </div>
            <pre className="language-html">
                <code>{circlesHTMLCodeBlock}</code>
            </pre>
            <pre className="language-css">
                <code>{circlesCSSCodeBlock}</code>
            </pre>
            <ul>
                <li>
                    <a href="https://www.joshwcomeau.com/animation/keyframe-animations/#timing-functions-2">
                        timing functions
                    </a>
                </li>
                <li>
                    <a href="https://www.joshwcomeau.com/animation/keyframe-animations/#looped-animations-3">
                        looped animations
                    </a>
                </li>
                <li>
                    <a href="https://www.joshwcomeau.com/animation/keyframe-animations/#multi-step-animations-4">
                        Multi-step animations
                    </a>
                </li>
                <li>
                    <a href="https://www.joshwcomeau.com/animation/keyframe-animations/#alternating-animations-5">
                        Alternating animations
                    </a>
                </li>
                <li>
                    <a href="https://www.joshwcomeau.com/animation/keyframe-animations/#shorthand-values-6">
                        Shorthand values
                    </a>
                </li>
                <li>
                    <a href="https://www.joshwcomeau.com/animation/keyframe-animations/#fill-modes-7">
                        Fill modes
                    </a>
                </li>
            </ul>
            <h3>CSS Sprite Animation</h3>
            <div className="sprite"></div>
            <h2>Sprite Animation with Canvas</h2>
            <canvas ref={canvasRef}></canvas>
            <pre className="language-js">
                <code>{canvasSpriteCodeBlock}</code>
            </pre>
        </div>
    );
};

function canvasApp(c: HTMLCanvasElement) {
    const canvas = c;
    const ctx = canvas.getContext("2d")!;

    const img = document.createElement("img");
    img.src = "./src/assets/images/player_big.png";

    const spriteW = 48,
        spriteH = 60;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    img.addEventListener("load", () => {
        let cycle = 0;
        setInterval(() => {
            ctx.clearRect(0, 0, spriteW, spriteH);
            ctx.drawImage(
                img,
                cycle * spriteW,
                0,
                spriteW,
                spriteH,
                0,
                0,
                spriteW,
                spriteH
            );
            cycle = (cycle + 1) % 8;
        }, 120);
    });
}


const blockCodeBlock = stripIndent`
.box {
    background-color: red;
    width: 100px;
    height: 100px;
    animation: rotate 3s infinite;
}

@keyframes rotate {
    from {
        transform: rotate(none);
    }
    to {
        transform: rotate(360deg);
    }
}
`;

const circlesHTMLCodeBlock = stripIndent`
<div className="circle one"></div>
<div className="circle two"></div>
<div className="circle three"></div>
`;

const circlesCSSCodeBlock = stripIndent`
.circle {
    display: inline-block;
    background-color: red;
    margin-right: 1rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: bounce alternate infinite cubic-bezier(.2, .65, .6, 1);
}

.circle.one {
    --bounce-offset: -20px;
    animation-duration: 200ms;
}

.circle.two {
    --bounce-offset: -30px;
    animation-duration: 300ms;
}

.circle.three {
    --bounce-offset: -40px;
    animation-duration: 400ms;
}

@keyframes bounce {
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(var(--bounce-offset));
    }
}
`;

const canvasSpriteCodeBlock = stripIndent`
const img = document.createElement("img");
img.src = "./src/assets/images/player_big.png";

// Each subpicture is 24 wide and 40 pixels high
const spriteW = 48,
    spriteH = 60;

// On the load event set up an interval to draw the next frame
img.addEventListener("load", () => {
    // cycle tracks our position in the animation. For each frame 
    // it is incremented and then clipped back to the 0 to 7 range
    // by using the remainder operator. This binding is then used
    // to compute the x-coordinate that the sprite for the current
    // pose has in the picture.
    let cycle = 0;

    setInterval(() => {
        ctx.clearRect(0, 0, spriteW, spriteH);
        ctx.drawImage(
            img,
            cycle * spriteW,
            0,
            spriteW,
            spriteH,
            0,
            0,
            spriteW,
            spriteH
        );
        cycle = (cycle + 1) % 8;
    }, 120);
});
`;
