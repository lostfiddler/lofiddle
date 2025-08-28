import React, { useRef, useEffect, useState } from "react";

import startGame from "./game.ts";
import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../../constants";

export default () => {
    const [loaded, setLoaded] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        addEventListener("load", (e) => setLoaded(true));
        if (!loaded) return;

        const c = canvasRef.current! as HTMLCanvasElement;

        c.width = CANVAS_WIDTH;
        c.height = c.width / CANVAS_WIDTH_RATIO;

        startGame(c);
    }, [loaded]);

    return (
        <div>
            <h1>Barren Room</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};
