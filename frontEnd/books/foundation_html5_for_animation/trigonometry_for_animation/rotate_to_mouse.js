import captureMouse from '../utils/captureMouse.js';

export default () => {

const main = document.querySelector('main');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1066;
canvas.height = 600;
main.appendChild(canvas);

const debug = document.createElement('div');
const mouse = captureMouse(canvas)
const arrow = new Image();

arrow.src = '/foundation_html5_for_animation/arrow-1717754.png';
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

main.appendChild(debug);

/***********************
*    ARTICLE CONTENT   *
************************/

const codeContainer = document.createElement('pre');
const codeBlock = document.createElement('code');

codeBlock.textContent = `const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const mouse = captureMouse(canvas)
const arrow = new Image();

arrow.src = 'path/to/image'
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
})()`

codeContainer.appendChild(codeBlock);
main.appendChild(codeContainer);

const Para = document.createElement('p');
Para.textContent = `
Functions of interest are ctx.translate(), ctx.rotate(), Math.atan2() and ctx.drawImage()
`

main.appendChild(Para);
}
