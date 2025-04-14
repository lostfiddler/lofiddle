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
                        <span className="subMenu-title">Nature of Code</span>
                        <ul>
                            <li className="chapter">Chapter 00 Randomness</li>
                            <li>
                                <a href="/random_walks">01 Random Walks</a>
                            </li>
                        </ul>
                    </div>
                    <div className="subMenu">
                        <span className="subMenu-title">Three js</span>
                        <ul>
                            <a href="/hello_cube">
                                <li>Hello Cube!</li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
