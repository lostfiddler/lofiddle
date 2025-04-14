import p5 from 'https://esm.sh/p5@1.9.3';

export function article() {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h1')
    title.textContent = 'Array of Movers: Accelerarion to Mouse'


    fragment.append(title, canvasApp())
    return fragment
}

function canvasApp() {
    const canvas = document.createElement("canvas");
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    new p5();

    let movers = [];
    let mouse = [];
    document.addEventListener('mousemove', (e) => {
        mouse = [e.clientX, e.clientY]
    });


    class Mover {
        constructor() {
            this.location = createVector(random(width), random(height));
            this.velocity = createVector(0, 0);
            this.direction;
            this.acceleration;
            this.topSpeed = 8;
        }

        update() {
            this.direction = createVector(mouse[0] - this.location.x, mouse[1] - this.location.y)
            this.acceleration = this.direction.normalize().mult(0.75)

            this.velocity.add(this.acceleration);
            this.velocity.limit(this.topSpeed);
            this.location.add(this.velocity);
        }

        display() {
            ctx.beginPath()
            ctx.arc(this.location.x, this.location.y, 16, 0, 360);
            ctx.fill();
            console.log(this.location.x, this.location.y)
        }

        checkEdges() {
            if (this.location.x > canvas.width) {
                this.location.x = 0;
            } else if (this.location.x < 0) {
                this.location.x = canvas.width;
            }

            if (this.location.y > canvas.height) {
                this.location.y = 0;
            } else if (this.location.y < 0) {
                this.location.y = canvas.height;
            }
        }
    }

    for (let i = 0; i <= 10; i++) {
        movers[i] = new Mover()
    }

    window.requestAnimationFrame(animate);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < movers.length; i++) {
            movers[i].update();
            movers[i].checkEdges();
            movers[i].display();
        }
        window.requestAnimationFrame(animate)
    }
    return canvas
}
