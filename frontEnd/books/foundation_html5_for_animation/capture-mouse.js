export default function captureMouse(element) {
    const mouse = { x: 0, y: 0 }

    element.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    })
    return mouse;
}