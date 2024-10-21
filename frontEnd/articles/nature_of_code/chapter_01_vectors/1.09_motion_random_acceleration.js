import p5 from 'https://esm.sh/p5@1.9.3';
export default () => {
    const main = document.querySelector('main');
    const canvas = document.createElement("canvas");
    canvas.width = 1066;
    canvas.height = 600;
    main.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    new p5();

    class Mover {
        constructor() {
            this.location = createVector(width / 2, height / 2);
            this.velocity = createVector(0, 0);
        }

        update() {
            let acceleration = p5.Vector.random2D();

            this.velocity.limit(5);
            this.velocity.add(acceleration);
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
}
