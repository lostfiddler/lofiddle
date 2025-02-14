import p5 from 'p5';

const p = new p5();

export function article() {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h1')
    title.textContent = 'A Smoother Approach with Perlin Noise'

    fragment.append(title, segment00, perlinGraph(), uniformGraph())
    return fragment;
}

const segment00 = document.createDocumentFragment();
render(
    <>
    <p>A good random number generator produces numbers that have no relationship 
    to one another and show no discrnible patter. However, while a litle bit of 
    randomness can be a good thing when programming organic, lifelike behaviours, 
    uniform randomness as the single guidingprinciple isn't necesssarily natural. 
    An algorithm known as <b>Perlin noise</b>, takes this concept into account by 
    producing a naturally ordered sequence of pseudorandom numbers, where each 
    number in the sequence is quite close in value to the one before it. This 
    creates a "smooth" transition between the random numbers and a more organic 
    apperance than pure noise, making Perlin noise well suited for generating 
    various effecs with natural qualities, such as clouds, landscapes, and 
    patterned textures like marble.</p>
    </>, segment00
)

function perlinGraph() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let x = 0;
    let yt = 0;

    ctx.beginPath();
    function draw() {
        requestAnimationFrame(draw);
        ctx.lineTo(x++, p.noise(yt += 0.01) * canvas.height);
        ctx.stroke();
    }

    draw();

    return canvas;
}

function uniformGraph() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let x = 0;

    ctx.beginPath();
    function draw() {
        requestAnimationFrame(draw);
        ctx.lineTo(x++, Math.random() * canvas.height);
        ctx.stroke();
    }

    draw();

    return canvas;
}
