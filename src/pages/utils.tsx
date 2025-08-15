import {p5} from "../../constants"

export function getMousePosition(e: MouseEvent) {
    let x: number;
    let y: number;

    const target = e.target! as HTMLCanvasElement;

    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y =
            e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= target.offsetLeft;
    y -= target.offsetTop;

    return p5.createVector(x, y);
}
