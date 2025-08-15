import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasApp(canvasRef.current!);
    });
    return (
        <div>
            <h1>Utilities and notes for Beginners</h1>
            <ul>
                <li>Size, measurements and units</li>
                <li>camera and orientation</li>
                <li>debugging</li>
                <li>use the console!</li>
            </ul>
            <canvas ref={canvasRef} width="500" height="700"></canvas>
        </div>
    );
};

function canvasApp(c: HTMLCanvasElement) {
    const canvas = c;
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const scene = new THREE.Scene();

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 1, 4);
    scene.add(dirLight);

    const camera = new THREE.PerspectiveCamera();
    camera.position.set(1, 1, 3);

    const axes = new THREE.AxesHelper(6);
    const grid = new THREE.GridHelper();
    scene.add(axes, grid);

    const gltfLoader = new GLTFLoader();
    const url = "/models/pirate_ship/ship-pirate-large.glb";
    gltfLoader.load(url, (gltf) => {
        const root = gltf.scene;
        root.scale.set(0.1, 0.1, 0.1);
        scene.add(root);
    });

    const controls = new OrbitControls(camera, canvas);
    controls.update();

    (function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    })();
}
