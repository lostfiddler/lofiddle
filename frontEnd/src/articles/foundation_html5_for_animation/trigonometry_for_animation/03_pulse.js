import Prism from 'prismjs';
import Ball from '../utils/ball.js';

export function article() {
    const fragment = document.createDocumentFragment()

    const title = document.createElement('h1')
    title.textContent = 'Pulsing motion'

    const codeHeading = document.createElement('h2')
    codeHeading.textContent = 'Source code'

    const code_block = `function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    let angle = 0;
    let centerScale = 1;
    let range = 0.5;
    let speed = 0.05;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.scaleX = ball.scaleY = centerScale + Math.sin(angle) * range;
        angle += speed;
        ball.draw(ctx);
    }());

    return canvas;
}
    ` 

    const pre = document.createElement('pre')
    const code = document.createElement('code')
    pre.className = 'language-js'
    code.className = 'language-js'
    const html = Prism.highlight(code_block, Prism.languages.javascript, 'javascript')
    code.innerHTML = html

    pre.appendChild(code)

    fragment.append(title, canvasApp(), codeHeading, pre)
    return fragment;
}

function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    let angle = 0;
    let centerScale = 1;
    let range = 0.5;
    let speed = 0.05;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.scaleX = ball.scaleY = centerScale + Math.sin(angle) * range;
        angle += speed;
        ball.draw(ctx);
    }());

    return canvas;
}
