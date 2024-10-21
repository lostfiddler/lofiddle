export default function(el) {
    const mouse = {x: 0, y: 0};

    el.onmousemove = (event) => {
        let x, y;
        if(event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            y = event.clientY + document.ody.scrollTop +
                document.documentElement.scrollTop;
        }
        x -= el.offsetLeft;
        y -= el.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }
    return mouse;
}
