import Prism from 'prismjs'

export function article() {
    const fragment = document.createDocumentFragment()
    const title = document.createElement('h1')
    title.textContent = 'Waves 2'

    const codeHeading = document.createElement('h2');
    codeHeading.textContent = 'Source code'

    const code_block = `function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const range = 50;
    const centerY = canvas.height / 2;
    const xspeed = 1;
    const yspeed = 0.05;
    let xpos = 0;
    let ypos = centerY;
    let angle = 0;

    ctx.lineWidth = 2;

    (function draw() {
        window.requestAnimationFrame(draw);

        ctx.beginPath();
        ctx.moveTo(xpos, ypos);
        xpos += xspeed;
        angle += yspeed;
        ypos = centerY + Math.sin(angle) * range;
        ctx.lineTo(xpos, ypos);
        ctx.stroke();
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
    const range = 50;
    const centerY = canvas.height / 2;
    const xspeed = 1;
    const yspeed = 0.05;
    let xpos = 0;
    let ypos = centerY;
    let angle = 0;

    ctx.lineWidth = 2;

    (function draw() {
        window.requestAnimationFrame(draw);

        ctx.beginPath();
        ctx.moveTo(xpos, ypos);
        xpos += xspeed;
        angle += yspeed;
        ypos = centerY + Math.sin(angle) * range;
        ctx.lineTo(xpos, ypos);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }())

    return canvas;
}
