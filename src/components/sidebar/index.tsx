import React, { useRef, useState, useEffect } from "react";
import "./style.css";

export default () => {
    const [nav, toggleNav] = useState(false);
    const [mobileMenu, toggleMobileMenu] = useState(true);
    const details = useRef<HTMLDetailsElement[]>([]).current;
    const navigationRef = useRef(null);
    const navigationContainerRef = useRef(null);

    useEffect(() => {
        openDetailElements(details);
        openNavigation(toggleNav, nav);
        handlePersistentStorage(details);
        window.onload = () => {
            navigationRef.current!.id =""
            navigationContainerRef.current!.id =""
        }
    }, []);

    return (
        <div
            ref={navigationContainerRef}
            id="notransition"
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
                onClick={() => {
                    toggleNav(!nav);
                    localStorage.setItem("navigation", "open");
                }}
            ></i>
            <div
                ref={navigationRef}
                id="notransition"
                className={nav ? "navigation" : "navigation closed"}
            >
                <div className="header">
                    <i
                        className="fa-solid fa-xmark xmark"
                        onClick={() => {
                            toggleNav(!nav);
                            localStorage.setItem("navigation", "closed");
                        }}
                    ></i>
                    <a href="/">
                        <h1>lofiddle</h1>
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
                        <summary>Nature of Code</summary>
                        <ul>
                            <li className="chapter">Chapter 00 Randomness</li>
                            <li>
                                <a href="/random_walks">
                                    01 - My First Random Walk
                                </a>
                            </li>
                            <li>
                                <a href="/random_number_distribution">
                                    02 - Random Number Distribution
                                </a>
                            </li>
                            <li>
                                <a href="/probability_and_non-uniform_distribution">
                                    03 - Probability & Non-Uniform Distributions
                                </a>
                            </li>
                            <li>
                                <a href="/a_normal_distribution_of_random_numbers">
                                    04 - A Normal Distribution of Random Numbers
                                </a>
                            </li>
                            <li>
                                <a href="/a_custom_distribution_of_random_numbers">
                                    05 - A Custom Distribution of Random Numbers
                                </a>
                            </li>
                            <li>
                                <a href="/a_smoother_approach_with_perlin_noise">
                                    06 - A Smoother Approach with Perlin Noise
                                </a>
                            </li>
                            <li className="chapter">Chapter 01 Vectors</li>
                            <li>
                                <a href="/intro_to_vectors">
                                    01 - Intro to Vectors
                                </a>
                            </li>
                            <li>
                                <a href="/more_vector_math">
                                    02 - More Vector Math
                                </a>
                            </li>
                            <li>
                                <a href="/motion_with_vectors">
                                    03 - Motion with Vectors
                                </a>
                            </li>
                        </ul>
                    </details>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="html_css"
                    >
                        <summary>HMTL/CSS</summary>
                        <ul>
                            <a href="/get_mouse_position">
                                <li>Get Mouse Position</li>
                            </a>
                            <a href="/dynamic_bezier_curves">
                                <li>Dynamic Bézier Curves</li>
                            </a>
                        </ul>
                    </details>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="three_js"
                    >
                        <summary>Three js</summary>
                        <ul>
                            <a href="/hello_cube">
                                <li>Hello Cube</li>
                            </a>
                            <a href="/load_obj">
                                <li>Load a .obj file</li>
                            </a>
                            <a href="/load_gltf">
                                <li>Laad a .gltf file</li>
                            </a>
                            <a href="/utilities">
                                <li>Utilities</li>
                            </a>
                        </ul>
                    </details>
                    <details
                        ref={(el) => {
                            if (el) details.push(el);
                        }}
                        data-name="arcade"
                    >
                        <summary>Arcade</summary>
                        <ul>
                            <a href="/adventure">
                                <li>Adventure</li>
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
        if (localStorage.key(i) === "navigation") continue;
        const item = localStorage.getItem(localStorage.key(i)!);

        if (item === "open") {
            details.find(
                (el) => el.dataset.name === localStorage.key(i)
            )!.open = true;
        }
    }
}

function openNavigation(toggleNav, nav) {
    if (localStorage.getItem("navigation") === "closed") {
        toggleNav(false);
    } else {
        toggleNav(true)
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
