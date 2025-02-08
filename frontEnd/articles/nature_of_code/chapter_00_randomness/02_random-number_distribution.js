import katex from 'katex';

export function article() {
    const fragment = document.createDocumentFragment();

    const title = document.createElement('h1');
    title.innerText = 'A Random Number Distribution';

    const para1 = document.createElement('p');
    para1.innerText = `The Math.random() functon produces a uniform 
    randomness which sometimes isn't the behaviour we are looking for.
    With a few tricks, however, the Math.random() function can instead produce
    nonuniform-distributions of random numbers, where some outcomes are more
    likely than others. This type of distribution can yield more interesting,
    seemingly natural results.`;

    fragment.append(title, canvasApp(), para1)
    return fragment;
}

function canvasApp() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;

    let randomCounts = [];
    let total = 20;

    for (let i = 0; i < total; i++) {
        randomCounts[i] = 0;
    }

    function draw() {
        requestAnimationFrame(draw)
        let index = Math.floor(Math.random() * randomCounts.length);
        randomCounts[index]++;

        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'grey';
        let w = canvas.width / randomCounts.length;
        for (let x = 0; x < randomCounts.length; x++) {
            ctx.fillRect(x * w, canvas.height - randomCounts[x], w - 1, randomCounts[x]);
            ctx.strokeRect(x * w, canvas.height - randomCounts[x], w - 1, randomCounts[x]);
        }
    }

    draw()

    return canvas;
}
