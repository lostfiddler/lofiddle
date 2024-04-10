(() => {
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    TracingMovements();
    MovementAlongVector();

    function MovementAlongVector() {

    }

    function TracingMovements() {

        const ball = {
            location: { x: 25, y: canvas.height / 2 },
            target_location: canvas.width / 2,
            speed: 1,
            interpolate() {
                if (this.location.x < this.target_location) {
                    this.location.x += this.speed;
                }
            },
            display() {
                ctx.beginPath();
                ctx.arc(this.location.x, this.location.y, 25, 0, 360);
                ctx.strokeStyle = '#0074d9'
                ctx.stroke();
            }
        }

        const tracer = {
            bag: [],
            interpolate(ballLocation) {
                if (ballLocation.x % 10 === 0) {
                    this.bag.push({ x: ballLocation.x - 25, y: canvas.height / 2 });
                }
            },
            display() {
                this.bag.forEach((i) => {
                    ctx.beginPath();
                    ctx.arc(i.x, i.y, 2, 0, 360);
                    ctx.fillStyle = '#fff'
                    ctx.fill();
                })
            }

        }

        let reqId = window.requestAnimationFrame(animate)

        function drawFrame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ball.display();
            tracer.display();

            ball.interpolate();
            tracer.interpolate(ball.location);
        }

        function animate() {
            reqId = window.requestAnimationFrame(animate);
            // any logic for fps would go here.
            console.log('animating!')
            drawFrame();
            if (ball.location.x >= canvas.width / 2) {
                window.cancelAnimationFrame(reqId);
                console.log('animation stopped!')
            }
        }
    }
})()