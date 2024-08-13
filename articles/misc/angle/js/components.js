function circle() {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(250, 250, 100, 0, Math.PI * 2);
    ctx.stroke();
}
function initialSide() {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = "#000000"
    ctx.moveTo(250, 250);
    ctx.lineTo(350, 250);
    ctx.stroke();
}

function terminalSide(theta) {
    ctx.beginPath();
    ctx.strokeStyle = "#000000"
    ctx.moveTo(250, 250);
    ctx.lineTo(250 + 100 * Math.cos(theta), 250 + 100 * Math.sin(theta));
    ctx.stroke();
}

module.exports = { circle, initialSide, terminalSide }