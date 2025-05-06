import React, { useRef, useState, useEffect } from "react";
import "./style.css";

export default () => {
    const [nav, toggleNav] = useState(true);
    const [mobileMenu, toggleMobileMenu] = useState(true);
    const details = useRef<HTMLDetailsElement[]>([]).current;

    useEffect(() => {
        openDetailElements(details);
        handlePersistentStorage(details);
    }, []);

    return (
        <div
            className={
                nav ? "navigation-container" : "navigation-container closed"
            }
        >
            <i
                className={
                    nav
                        ? "fa-solid fa-arrow-right-from-bracket open-arrow"
                        : "fa-solid fa-arrow-right-from-bracket open-arrow closed"
                }
                onClick={() => toggleNav(!nav)}
            ></i>
            <div className={nav ? "navigation" : "navigation closed"}>
                <div className="header">
                    <i
                        className="fa-solid fa-xmark xmark"
                        onClick={() => toggleNav(!nav)}
                    ></i>
                    <a href="/">
                        <h1 className="navigationTitle">lofiddle</h1>
                    </a>
                    <i
                        className="fa-solid fa-bars bars"
                        onClick={() => toggleMobileMenu(!mobileMenu)}
                    ></i>
                </div>
                <div className={mobileMenu ? "menu" : "menu opened"}>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="nature_of_code"
                    >
                        <summary className="title">Nature of Code</summary>
                        <ul>
                            <li className="chapter">Chapter 00 Randomness</li>
                            <li>
                                <a href="/random_walks">01 Random Walks</a>
                            </li>
                            <li>
                                <a href="/random_number_distribution">
                                    02 Random Number Distribution
                                </a>
                            </li>
                            <li>
                                <a href="/probability_and_non-uniform_distribution">
                                    03 Probability & Non-Uniform Distributions
                                </a>
                            </li>
                            <li>
                                <a href="/a_normal_distribution_of_random_numbers">
                                    04 A Normal Distribution of Random Numbers
                                </a>
                            </li>
                            <li>
                                <a href="/a_custom_distribution_of_random_numbers">
                                    05 A Custom Distribution of Random Numbers
                                </a>
                            </li>
                            <li>
                                <a href="/a_smoother_approach_with_perlin_noise">
                                    06 A Smoother Approach with Perlin Noise
                                </a>
                            </li>
                        </ul>
                    </details>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="three_js"
                    >
                        <summary className="title">Three js</summary>
                        <ul>
                            <a href="/hello_cube">
                                <li>Hello Cube!</li>
                            </a>
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    );
};

function openDetailElements(details: HTMLDetailsElement[]) {
    for (let i = 0; localStorage.length > i; i++) {
        const item = localStorage.getItem(localStorage.key(i)!);

        if (item === "open") {
            details.find(
                (el) => el.dataset.name === localStorage.key(i)
            )!.open = true;
        }
    }
}

function handlePersistentStorage(details: HTMLDetailsElement[]) {
    details.forEach((el) => {
        el.addEventListener("toggle", (e: Event) => {
            const target = e.target as HTMLDetailsElement;

            if (target.open) {
                localStorage.setItem(`${target.dataset.name}`, "open");
            } else {
                localStorage.setItem(`${target.dataset.name}`, "closed");
            }
        });
    });
}
