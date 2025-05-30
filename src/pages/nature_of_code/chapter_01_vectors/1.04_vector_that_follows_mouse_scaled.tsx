import React from 'react';

export default () => {
    return(
        <div>
            <h1>A Scaled Vector</h1>
        </div>
    )
}

export function article() {
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h1')
    title.textContent = 'Vector that Follows Mouse Scaled'


    fragment.append(title, canvasApp())
    return fragment
}

function canvasApp() {
    const canvas = document.createElement("canvas");
    canvas.width = 1066;
    canvas.height = 600;

    const width = canvas.width;
    const height = canvas.height;

    const ctx = canvas.getContext('2d');

    let mouse = [];
    let origin = [width / 2, height / 2]

    document.addEventListener("mousemove", (e) => {
        mouse = [(e.clientX + origin[0]) * 0.5, (e.clientY + origin[1]) * 0.5]
        console.log(mouse)
    })

    window.requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, width, height);


        ctx.beginPath();
        ctx.moveTo(origin[0], origin[1]);
        ctx.lineTo(mouse[0], mouse[1]);
        ctx.closePath();
        ctx.stroke();

        window.requestAnimationFrame(draw);
    }
    return canvas
}
