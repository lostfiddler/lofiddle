export function article() {
    const fragment = document.createDocumentFragment();

    const para1 = document.createElement('p');
    para1.innerText = `Some`

    fragment.append(canvasApp())
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
