import Prism from 'prismjs'
import captureMouse from '../utils/captureMouse.js';

export function article() {
    const fragment = document.createDocumentFragment()
    const title = document.createElement('h1')
    title.textContent = 'Distance of a line'

    const codeHeading = document.createElement('h2');
    codeHeading.textContent = 'Source code'

    const code_block = `function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const mouse = captureMouse(canvas);
    const log = document.createElement('pre');
    const rect = { x: canvas.width / 2, y: canvas.height / 2 };

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const dx = rect.x - mouse.x;
        const dy = rect.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        ctx.fillStyle = '#000';
        ctx.fillRect(rect.x - 2, rect.y - 2, 4, 4);
        // draw line
        ctx.beginPath();
        ctx.moveTo(rect.x, rect.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();

        log.textContent = dist;
    }())

    return canvas;
}
    `;

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
    const mouse = captureMouse(canvas);
    const log = document.createElement('pre');
    const rect = { x: canvas.width / 2, y: canvas.height / 2 };

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const dx = rect.x - mouse.x;
        const dy = rect.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        ctx.fillStyle = '#000';
        ctx.fillRect(rect.x - 2, rect.y - 2, 4, 4);
        // draw line
        ctx.beginPath();
        ctx.moveTo(rect.x, rect.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();

        log.textContent = dist;
    }())

    return canvas;
}
