import katex from 'katex';

export function article() {
    const fragment = document.createDocumentFragment();

    const title = document.createElement('h1');
    title.innerText = 'Probability and Nonuniform Distributions'

    const math01 = katex.renderToString(`
        \\text{number of aces / number of cards}= 4/52 = 0.077 \\approx 8\\%
        `)

    const math02 = katex.renderToString(`
        (1/2) \\times (1/2) \\times (1/2) = 1/8 = 0.125 = 12.5\\%
        `)

    const codeExample00 = `//1 and 3 are stored in the array twice, making them more likely to be picked than 2.
let stuff = [1, 1, 2, 3, 3]
//Pick a random element from an arry.
let value = stuff[Math.floor(Math.random() * stuff.length - 1)]
console.log(value)`

    const para1 = document.createElement('div')
    render(
        <>
        <p><b>Single-event probability</b> is the likelihood that a given
        event will occur. Take a deck of 52 cards. The probability of 
        drawing an ace from that deck is as follows:</p>
        <p dangerouslySetInnerHTML = {{__html: math01}} />
        <p>You can also calculate the probability of multiple events occurring
        in sequence by multiplying the individual probabilities of each event.
        For example, here's the probability of a coin turning up heads three times
        in a row:</p>
        <p dangerouslySetInnerHTML = {{__html: math02}} />
        <p>You can use the <code class='language-js'>Math.random()</code> function 
        in a couple ways to apply the concepts of probability in code for a nonuniform
        distribution. One technique is to fill an array with numbers-some of which are
        repeated-and then choose random elements from that array and generate events
        based on those choices:</p>
        <pre><code class='language-js'>{codeExample00}</code></pre>
        <p>The five-member array has two 1s, so running this code will log a 40 percent chance
        of printing the value 1. Likewise, there's a 20 percent chance of printing 2
        and a 40 percent chance of printing 3.</p>
        <p>You can also ask for a random number and allow an event to occur only if the random
        number is within a certain range. For example the Walker class can be modified so it
        tends to move in a particular direction. Here's an example of a <code class='language-js'>
        Walker</code> object with the following probabilities:</p>
        <ul>
            <li>Chance of moving up: 20 percent</li>
            <li>Chance of moving down: 20 percent</li>
            <li>Chance of moving left: 20 percent</li>
            <li>Chance of moving right: 40 percent</li>
        </ul>
        <h3>Example: A Walker that tends to move to the right</h3>
        </>
    , para1)

    const codeString = `step() {
    let r = Math.random();
    if (r < 0.4) {
      // A 40% chance of moving to the right
      this.x++;
    } else if (r < 0.6) {
      this.x--;
    } else if (r < 0.8) {
      this.y++;
    } else {
      this.y--;
    }
  }`
    const codeExample01 = document.createElement('div')
    render(
        <>
            <pre><code class='language-js'>{codeString}</code></pre>
        </>
        , codeExample01)

    fragment.append(title, para1, canvasApp(), codeExample01)
    return fragment;
}

function canvasApp() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;

    const walker = new Walker(ctx, canvas.width, canvas.height)

    function draw() {
        requestAnimationFrame(draw)

        walker.step()
        walker.display()
    }

    draw()

    return canvas;
}

class Walker {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx;
        this.location = {x: canvasW, y: canvasH};
    }

    display() {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.location.x / 2, this.location.y / 2, 2, 2);
    }

    step() {
        let r = Math.random() * 1;

        if (r < 0.4) {
            this.location.x++;
        } else if (r < 0.6) {
            this.location.x--;
        } else if (r < 0.8) {
            this.location.y++;
        } else {
            this.location.y--;
        }
    }
}
