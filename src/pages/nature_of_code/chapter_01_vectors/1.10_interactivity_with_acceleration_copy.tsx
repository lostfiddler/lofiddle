import React from 'react';
import p5 from 'p5';

export default () => {
    return(
        <div>
            <h1>Interactive Acceleration</h1>
        </div>
    )
}
export function article() {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h1')
    title.textContent = 'Interactivity with Acceleration'

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

    let mouse = [];
    document.addEventListener('mousemove', (e) => {
        mouse = [e.clientX, e.clientY]
    });


    class Mover {
        constructor() {
            this.location = createVector(width / 2, height / 2);
            this.velocity = createVector(0, 0);
            this.direction;
            this.acceleration;
            this.topSpeed = 8;
        }

        update() {
            this.direction = createVector(mouse[0] - this.location.x, mouse[1] - this.location.y)

            this.direction.normalize();
            this.direction.mult(0.75);
            this.acceleration = this.direction;

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

    let mover = new Mover();

    window.requestAnimationFrame(animate);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        mover.update();
        mover.display();
        mover.checkEdges();
        window.requestAnimationFrame(animate)
    }
    return canvas
}
