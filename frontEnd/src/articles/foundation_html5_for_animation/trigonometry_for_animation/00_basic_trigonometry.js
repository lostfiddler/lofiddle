export function article() {
    const fragment = document.createDocumentFragment()

    const title = document.createElement('h1')
    title.textContent = 'Basic Trigonometry'

    const p1 = document.createElement('p')

    p1.textContent = `Trigonometry is the study of triangles and the relationship
    of their sides and angles. It should go without saying if you are programming
    animations you will be using trigonometry extensively.`

    const p2 = document.createElement('p')

    p2.textContent = `Apparently programming with trigonometry hardly involves
    numbers at all. Instead it is more about visualizing shapes and relationships.
    We will mainly be dealing with variables containing positions, distances, and
    angles, never actually seeing the actual numbers. Allegedly, 90% of the
    trigonomety needed for basic animation comes down to two functions: Math.sin and
    Math.cos.`

    fragment.append(title, p1, p2, angleApp())
    return fragment;
}

function angleApp() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width  = 300;
    canvas.height = 200;


    ctx.fillStyle = 'grey'
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.moveTo(0, canvas.height)
    ctx.lineTo(canvas.width, 0)
    ctx.stroke();

    return canvas;
}
