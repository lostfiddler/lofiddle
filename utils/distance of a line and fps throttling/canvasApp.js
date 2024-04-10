let startTime = performance.now();

const canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const debug = document.createElement('span')
document.body.appendChild(debug)

const speed = 5;
let location_1 = { x: 20, y: 250 };
let location_2 = { x: 480, y: 250 };

// Use distance formula to get the length between two points.
// Reference: https://en.wikipedia.org/wiki/Euclidean_distance

let delta_x = location_2.x - location_1.x;
let delta_y = location_2.y - location_1.y;

let distance = Math.sqrt(delta_x ** 2 + delta_y ** 2);

let ticks = distance / speed;

let x_movements = delta_x / ticks;
let y_movements = delta_y / ticks;

let ball = { x: location_1.x, y: location_1.y }


window.requestAnimationFrame(gameLoop);

function drawScreen(elapsedTime) {
    debug.textContent = elapsedTime
    if (ticks > 0) {
        ball.x += x_movements;
        ball.y += y_movements;
        ticks--;
    }
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 25, 0, 360);
    ctx.fill();
}

function gameLoop(time) {
    const elapsedTime = time - startTime;
    window.requestAnimationFrame(gameLoop);

    // logic to throttle FPS
    // Reference: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

    if (/** wait for 200 milliseconds to pass */ elapsedTime > 200) {
        startTime = time; // needed to set elapsedTime to 0 for next loop
        drawScreen(time);
    }
}