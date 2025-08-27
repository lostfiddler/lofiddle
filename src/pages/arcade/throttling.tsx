import { stripIndent } from "common-tags";
import React from "react";

export default () => {
    return (
        <div>
            <h1>Throttling fps</h1>
            <pre className="language-js">
                <code>
                    {stripIndent`
                        let fpsInterval: number;
                        let startTime: number;
                        let now: number;
                        let then: number;
                        let elapsed: number;

                        startAnimating(10);

                        function startAnimating(fps: number) {
                            fpsInterval = 1000 / fps;
                            then = Date.now();
                            startTime = then;
                            animate();
                        }

                        function animate() {
                            requestAnimationFrame(animate);

                            now = Date.now();
                            elapsed = now - then;

                            if (elapsed > fpsInterval) {
                                then = now - (elapsed % fpsInterval);

                                // Put drawing code here
                            }
                        }
                    `}
                </code>
            </pre>
        </div>
    );
};
