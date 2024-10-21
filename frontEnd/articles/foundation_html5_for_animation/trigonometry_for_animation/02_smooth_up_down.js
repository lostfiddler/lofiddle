import Prism from 'prismjs';
import Ball from '../utils/ball.js';
import Figure2URL from '../images/figure-2.png'

export function article() {
    const fragment = document.createDocumentFragment()
    const title = document.createElement('h1')
    title.textContent = 'Bobbing up and down'

    const p1 = document.createElement('p')
    p1.textContent = `The figure below is the graphical representation of the sin
    function when fed in all the angles from 0 to 360 (or 0 to 2 pi in radians).`

    const figure_2 = new Image()
    figure_2.src = Figure2URL;
    figure_2.width = 400;

    const p2 = document.createElement('p');
    p2.textContent = `The sin function is especially usefull when you need to move
    something up and down or back and forth smoothly. Just keep adding on to the angle,
    and you keep getting the wave over and over again.`

    const codeHeading = document.createElement('h2')
    codeHeading.textContent = 'Source Code'
    const code_block = `import Ball from '../utils/ball.js;'

function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    const ball = new Ball();
    const debug = document.createElement('pre')
    const speed = 0.1;
    const centerY = canvas.height / 2
    const range = 50;
    let angle = 0;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    console.log(ball);
    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.y = centerY + Math.sin(angle) * range;
        angle += speed;
        ball.draw(ctx);
        debug.textContent = ball.y;
    }())

    return canvas;
}`

    const html = Prism.highlight(code_block, Prism.languages.javascript, 'javascript')
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    pre.classList = 'language-js'
    code.classList = 'language-js'
    code.innerHTML = html

    pre.appendChild(code)

    fragment.append(title, p1, figure_2, p2, canvasApp(), codeHeading, pre)
    return fragment;
}

function canvasApp() {
    const canvas = document.createElement('canvas');
    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;
    const ctx = canvas.getContext('2d');

    const ball = new Ball();
    const debug = document.createElement('pre')
    const speed = 0.1;
    const centerY = canvas.height / 2
    const range = 50;
    let angle = 0;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    console.log(ball);
    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.y = centerY + Math.sin(angle) * range;
        angle += speed;
        ball.draw(ctx);
        debug.textContent = ball.y;
    }())

    return canvas;
}
