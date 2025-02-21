import p5 from 'p5';
import {resize} from '../../misc/utils.js'

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
    // TODO buffer grows indeffinetly, need to fix
    // TODO second call to kitten() causes animation to lag, need fix
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let x = 0;
    let t = 0;
    let i = 0;
    let buffer = kitten();

    p.noiseSeed(21)

    // reduse pixelation
    resize(canvas);

    // initial frame
    ctx.drawImage(buffer[0], 0, 0, canvas.width, canvas.height)

    function draw() {
        requestAnimationFrame(draw);
        ctx.clearRect(0,0,canvas.width,canvas.height)
        carousel()
    }

    function carousel() {
        if (x < -canvas.width) {
            i++;
            x = 0;
            buffer.push(...kitten());
        }
        ctx.drawImage(buffer[i], x--, 0, canvas.width, canvas.height)
        ctx.drawImage(buffer[i + 1], x + canvas.width - 5, 0, canvas.width, canvas.height)
    }

    function kitten() {
        const a = [];

        for(let i = 0;i < 2;i++) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            resize(canvas)

            ctx.strokeStyle = 'red'
            ctx.beginPath()
            for (let x1 = 0;x1 < canvas.width;x1++) {
                ctx.lineTo(x1++, p.noise(t += 0.01) * canvas.height)
                ctx.stroke();
            }
            a.push(canvas)
        }
        return a;
    }

    draw()

    return canvas;
}

function uniformGraph() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let x = 0;

    resize(canvas)

    ctx.beginPath();
    function draw() {
        requestAnimationFrame(draw);
        ctx.lineTo(x++, Math.random() * canvas.height);
        ctx.stroke();
    }

    draw();

    return canvas;
}
