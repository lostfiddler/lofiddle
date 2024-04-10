class Ball {
    constructor(ctx) {
        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.location = { x: 25, y: canvas.height / 2 };
        this.target_location = canvas.width / 2;
        this.speed = 1;
    }

    interpolate() {
        if (this.location.x < this.target_location) {
            this.location.x += this.speed;
        }
    }

    display() {
        this.ctx.beginPath();
        this.ctx.arc(this.location.x, this.location.y, 25, 0, 360);
        this.ctx.strokeStyle = '#0074d9'
        this.ctx.stroke();
    }
}

class Tracer {
    constructor(ctx) {
        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.bag = [];
    }

    interpolate(ballLocation) {
        if (ballLocation.x % 10 === 0) {
            this.bag.push({ x: ballLocation.x - 25, y: canvas.height / 2 });
        }
    }

    display() {
        this.bag.forEach((i) => {
            this.ctx.beginPath();
            this.ctx.arc(i.x, i.y, 2, 0, 360);
            this.ctx.fillStyle = '#fff'
            this.ctx.fill();
        })
    }
}

export { Ball, Tracer }