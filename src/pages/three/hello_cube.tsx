import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        const scene = new THREE.Scene();

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
        const cube = new THREE.Mesh(geometry, material);

        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);

        camera.position.z = 2;

        scene.add(cube);

        function render(time: number) {
            time *= 0.001 // convert time to seconds

            cube.rotation.x = time;
            cube.rotation.y = time;

            renderer.render(scene, camera);

            requestAnimationFrame(render);
        }
        requestAnimationFrame(render)
    }, []);

    return (
        <div>
            <h1>My first three.js program!</h1>
            <canvas ref={canvasRef}></canvas>
            <p>This was really fun! I was introduced to all the fundamentals - 
            scenegraph, camera, mesh, and lights. Some things that stood out to
            me:</p>
            <ul>
                <li>It's pretty hard to visualize 3d space using a 2d
                coordinate graph, i'm not sure how important this will be
                though</li>
            </ul>
        </div>
    );
};
