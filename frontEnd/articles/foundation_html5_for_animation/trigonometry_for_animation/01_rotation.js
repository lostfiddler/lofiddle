import Prism from 'prismjs'
import captureMouse from '../utils/captureMouse.js';
import arrowURL from '../images/arrow-1717754.png';

console.log(window.env.foo)
export function article() {
    const fragment = document.createDocumentFragment()

    const title = document.createElement('h1')
    title.textContent = 'Rotation Based on Mouse location'

    const p1 = document.createElement('p')
    p1.textContent = `Rotating an object in 2D involves the relationship between two
    variables, the coordinates of our object and the coordinates of the object it
    is rotating in relation to. In the case of the canvas application above our
    object is the arrow and it rotates in relation to the mouse.`

    const p2 = document.createElement('p')
    p2.textContent = `Subtracting the x and y coordinates of the arrow and the mouse
    will yield the length of the two triangle legs. Using `

    const code_block200 = 'Math.atan2(dy, dx)'
    const code200 = document.createElement('code')
    code200.className = 'language-js'
    const p200 = document.createElement('span')
    p200.textContent = ` calculates
    the angle and gives the proper argument for `
    const html200 = Prism.highlight(code_block200, Prism.languages.javascript, 'javascript')
    code200.innerHTML = html200

    const code_block210 =  'ctx.rotate()'
    const code210 = document.createElement('code')
    code210.className = 'language-js'
    const html210 = Prism.highlight(code_block210, Prism.languages.javascript, 'javascript')
    code210.innerHTML = html210
    p2.append(code200, p200, code210)

    const subHeading00 = document.createElement('h2')
    subHeading00.textContent = 'Source Code'

    const code_block = `function canvasApp() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    const debug = document.createElement('div');
    const mouse = captureMouse(canvas)
    const arrow = new Image();

    arrow.src = arrowURL;
    arrow._width = 200;
    arrow._height = 200;
    arrow._x = canvas.width / 2 - arrow._width;
    arrow._y = canvas.height / 2;

    (function draw() {
        window.requestAnimationFrame(draw);
        const dx = mouse.x - arrow._x;
        const dy = mouse.y - arrow._y;

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillRect(
            canvas.width / 2, 
            canvas.height / 2, 
            10, 
            10
        );
        ctx.fillStyle = 'red'
        ctx.save();
        ctx.translate(arrow._x, arrow._y)
        ctx.rotate(Math.atan2(dy, dx));
        ctx.drawImage(
            arrow,
            0,
            -85,
            arrow._width,
            arrow._height
        );
        ctx.restore();
    })()

    return canvas;

    main.appendChild(debug);
}
    `

    const html = Prism.highlight(code_block, Prism.languages.javascript, 'javascript')
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    pre.classList = 'language-js'
    code.classList = 'language-js'
    code.innerHTML = html

    pre.appendChild(code)
    fragment.append(title, p1, canvasApp(), p2, subHeading00, pre)
    return fragment
}

function canvasApp() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;

    const debug = document.createElement('div');
    const mouse = captureMouse(canvas)
    const arrow = new Image();

    arrow.src = arrowURL;
    arrow._width = 200;
    arrow._height = 200;
    arrow._x = canvas.width / 2 - arrow._width;
    arrow._y = canvas.height / 2;

    (function draw() {
        window.requestAnimationFrame(draw);
        const dx = mouse.x - arrow._x;
        const dy = mouse.y - arrow._y;

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillRect(canvas.width / 2, canvas.height / 2, 10, 10);
        ctx.fillStyle = 'red'
        ctx.save();
        ctx.translate(arrow._x, arrow._y)
        ctx.rotate(Math.atan2(dy, dx));
        ctx.drawImage(arrow, 0, -85, arrow._width, arrow._height);
        ctx.restore();

        debug.textContent = `mouse.x: ${mouse.x}     mouse.y: ${mouse.y}`;
    })()

    return canvas;

    main.appendChild(debug);
}

