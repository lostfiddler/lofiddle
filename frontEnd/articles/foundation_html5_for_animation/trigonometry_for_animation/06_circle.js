import Ball from '../utils/ball.js';
import Prism from 'prismjs';

export function article() {
    const fragment = document.createDocumentFragment()
    const title = document.createElement('h1')
    title.textContent = 'Circle'

    const codeHeading = document.createElement('h2');
    codeHeading.textContent = 'Source code'

    const code_block = `function canvasApp() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    let centerX;
    let centerY;
    const radius = 50;
    const speed = 0.05;
    let angle = 0;

    (function draw() {
        window.requestAnimationFrame(draw);
        resizeCanvas(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = centerX + Math.sin(angle) * radius;
        ball.y = centerY + Math.cos(angle) * radius;
        angle += speed;
        ball.draw(ctx);
    }())

    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth > 1200 ?
            800 :
            (window.innerWidth - 300) * 0.6;
        canvas.height = canvas.width * (9/16);
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
    }
    
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
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    let centerX;
    let centerY;
    const radius = 50;
    const speed = 0.05;
    let angle = 0;

    (function draw() {
        window.requestAnimationFrame(draw);
        resizeCanvas(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = centerX + Math.sin(angle) * radius;
        ball.y = centerY + Math.cos(angle) * radius;
        angle += speed;
        ball.draw(ctx);
    }())

    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth > 1200 ?
            800 :
            (window.innerWidth - 300) * 0.6;
        canvas.height = canvas.width * (9/16);
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
    }
    
    return canvas;
}
