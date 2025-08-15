import React, { useState, useRef, useEffect } from "react";

import "./dynamic_bezier_curves.css"
import {CANVAS_WIDTH} from "../../../constants.js";

const c = {
    startPoint: [25, 50],
    controlPoint: [100, 1],
    endPoint: [175, 50],
};

export default () => {
    return (
        <div>
            <h1>Dynamic Bézier Curves</h1>
            <a href="https://www.joshwcomeau.com/animation/dynamic-bezier-curves/">
                ref
            </a>
            <DynamicCurve />
        </div>
    );
};

function DynamicCurve() {
    const [curve, setCurve] = useState(c);
    const circleRef = useRef(null);
    useEffect(() => {
        const circle = circleRef.current! as SVGCircleElement;
        console.log(circle.getTotalLength())
    })

    return (
        <div>
            <svg viewBox="0 0 200 100">
                <rect width="100%" height="100%" fill="white" />
                <path
                    d={`
            M ${curve.startPoint}
            Q ${curve.controlPoint} ${curve.endPoint}
            `}
                    fill="none"
                    stroke="hotpink"
                    strokeWidth={3}
                />
                <circle
                    ref={circleRef}
                    cx={curve.startPoint[0]}
                    cy={curve.startPoint[1]}
                    r="5"
                    fill="#0080ff"
                />
                <circle
                    cx={curve.endPoint[0]}
                    cy={curve.endPoint[1]}
                    r="5"
                    fill="#0080ff"
                />
            </svg>
        </div>
    );
}
