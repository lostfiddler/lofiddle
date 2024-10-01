import Prism from 'prismjs'
import captureMouse from '../utils/captureMouse.js';
import arrowURL from '../arrow-1717754.png'

export {
    title,
    canvasApp,
    article
}

function title() {
    const titleElement = document.createElement('h1')
    titleElement.textContent = 'Rotation Based on Mouse location'

    return titleElement;
}

function canvasApp() {
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

function article() {
    const fragment = document.createDocumentFragment()

    const p1 = document.createElement('p')
    p1.textContent = `Rotating an object in 2D involves the relationship between two
    variables, the coordinates of our object and the coordinates of the object it
    is rotating in relation to. In the case of the canvas application above our
    object is the arrow and it rotates in relation to the mouse.`

    const code_block = 'var kitten = "kat"'

    const html = Prism.highlight(code_block, Prism.languages.javascript, 'javascript')
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    pre.classList = 'language-js'
    code.classList = 'language-js'
    code.innerHTML = html

    pre.appendChild(code)
    fragment.append(p1, pre)
    return fragment
}
