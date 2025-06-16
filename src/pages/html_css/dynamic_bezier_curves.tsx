import React, { useState, useEffect } from "react";
import GUI from "lil-gui";

export default () => {
    const [startPoint, setStartPoint] = useState({ x: 25, y: 25 });
    const controlPoint = [300, 175];
    const endPoint = [25, 325];

    useEffect(() => {
        const gui = new GUI();

        gui.add(startPoint, "x", 0, 100).onChange((value: number) => {
            setStartPoint((prevPoint) => ({ ...prevPoint, x: value }));
        });
    }, []);

    return (
        <div>
            <h1>Dynamic Bézier Curves</h1>
            <a href="https://www.joshwcomeau.com/animation/dynamic-bezier-curves/">
                ref
            </a>
            <svg viewBox="0 0 200 350">
                <path
                    d={`
                        M ${[startPoint.x, startPoint.y]}
                        Q ${controlPoint} ${endPoint}
                    `}
                    fill="none"
                    stroke="hotpink"
                    strokeWidth={5}
                />
            </svg>
        </div>
    );
};
