import React, { useState } from "react";
import "./style.css";

export default () => {
    const [nav, toggleNav] = useState(true);
    const [menu, toggleMenu] = useState(true);

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
                        <h1 className="navigationTitle">loFiddle</h1>
                    </a>
                    <i
                        className="fa-solid fa-bars bars"
                        onClick={() => toggleMenu(!menu)}
                    ></i>
                </div>
                <div className={menu ? "menu" : "menu opened"}>
                    <div className="subMenu">
                        <details className="subMenu-title">
                            <summary>Nature of Code</summary>
                            <ul>
                                <li className="chapter">
                                    Chapter 00 Randomness
                                </li>
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
                                        03 Probability & Non-Uniform
                                        Distributions
                                    </a>
                                </li>
                                <li>
                                    <a href="/a_normal_distribution_of_random_numbers">
                                        04 A Normal Distribution of Random
                                        Numbers
                                    </a>
                                </li>
                                <li>
                                    <a href="/a_custom_distribution_of_random_numbers">
                                        05 A Custom Distribution of Random
                                        Numbers
                                    </a>
                                </li>
                                <li>
                                    <a href="/a_smoother_approach_with_perlin_noise">
                                        06 A Smoother Approach with Perlin Noise
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </div>
                    <div className="subMenu">
                        <details className="subMenu-title">
                            <summary>Three js</summary>
                            <ul>
                                <a href="/hello_cube">
                                    <li>Hello Cube!</li>
                                </a>
                            </ul>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
};
