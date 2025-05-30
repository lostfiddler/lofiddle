import React from 'react';
import p5 from 'p5';

export default () => {
    return(
        <div>
            <h1>Vector, Motion & Velocity</h1>
        </div>
    )
}

export function article() {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h1')
    title.textContent = 'Vector, Motion, Velocity'

    fragment.append(title, canvasApp())
    return fragment
}

function canvasApp() {
    const canvas = document.createElement("canvas");
    canvas.width = 1066;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    new p5();

    class Mover {
        constructor() {
            this.location = createVector(random(width), random(height));
            this.velocity = createVector(random(-2, 2), random(-2, 2));
        }

        update() {
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
