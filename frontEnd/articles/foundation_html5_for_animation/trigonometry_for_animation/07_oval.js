import Prism from 'prismjs'
import Ball from '../utils/ball.js';

export function article() {
    const fragment = document.createDocumentFragment()
    const title = document.createElement('h1')
    title.textContent = 'Oval'

    const codeHeading = document.createElement('h2');
    codeHeading.textContent = 'Source code'

    const code_block = `function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radiusX = 150;
    const radiusY = 100;
    const speed = 0.05;
    let angle = 0;

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = centerX + Math.sin(angle) * radiusX;
        ball.y = centerY + Math.cos(angle) * radiusY;
        angle += speed;
        ball.draw(ctx);
    }())

    return canvas;
}`;

    const html = Prism.highlight(code_block, Prism.languages.javascript, 'javascript')
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    pre.classList = 'language-js'
    code.classList = 'language-js'
    code.innerHTML = html
    pre.appendChild(code)

    fragment.append(title, canvasApp(), codeHeading, pre)
    return fragment
}

function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radiusX = 150;
    const radiusY = 100;
    const speed = 0.05;
    let angle = 0;

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = centerX + Math.sin(angle) * radiusX;
        ball.y = centerY + Math.cos(angle) * radiusY;
        angle += speed;
        ball.draw(ctx);
    }())

    return canvas;
}
