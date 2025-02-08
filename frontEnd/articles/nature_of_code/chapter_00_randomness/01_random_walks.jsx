import Prism from 'prismjs'

export function article() {
    const fragment = document.createDocumentFragment();

    const title = document.createElement('h1');
    title.innerText = 'Random walks';

    const para1 = document.createElement('p')
    render(
        <>
        The JavaScript function <code class='language-js'>Math.random()</code> 
        returns a random number between 0 and 1.
        </>
        , para1)

    const code_block = `function canvasApp() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;

    class Walker {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
        }

        show () {
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.x, this.y, 1, 1)
        }

        step() {
            let choice = Math.floor(Math.random() * 4)

            if (choice === 0) {
                this.x++;
            } else if (choice === 1) {
                this.x--;
            } else if (choice === 2) {
                this.y++;
            } else {
                this.y--;
            }
        }
    }

    let walker = new Walker()

    function draw() {
        requestAnimationFrame(draw)
        walker.show();
        walker.step();
    }

    draw()

    return canvas;
}
    `

    const prismHTML = Prism.highlight(code_block, Prism.languages.javascript, 'javascript')
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    pre.classList = 'language-js'
    code.classList = 'language-js'
    code.innerHTML = prismHTML

    pre.append(code)

    fragment.append(title, para1, canvasApp(), pre)

    return fragment;
}


function canvasApp() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.env.canvasWidth;
    canvas.height = window.env.canvasHeight;

    class Walker {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
        }

        show () {
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.x, this.y, 1, 1)
        }

        step() {
            let choice = Math.floor(Math.random() * 4)

            if (choice === 0) {
                this.x++;
            } else if (choice === 1) {
                this.x--;
            } else if (choice === 2) {
                this.y++;
            } else {
                this.y--;
            }
        }
    }

    let walker = new Walker()

    function draw() {
        requestAnimationFrame(draw)
        walker.show();
        walker.step();
    }

    draw()

    return canvas;
}
