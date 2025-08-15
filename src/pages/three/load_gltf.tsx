import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { stripIndent } from "common-tags";

export default () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasApp(canvasRef.current!);
    }, []);

    return (
        <div>
            <h1>Loading a .gltf File</h1>
            <p>
                <a href="https://threejs.org/manual/#en/load-gltf">Link</a> to
                manual.
            </p>
            <canvas ref={canvasRef} width="600" height="700"></canvas>
            <pre className="language-js">
                <code>{code_block}</code>
            </pre>
            <h2>
                <span
                    style={{ textDecoration: "underline" }}
                    className="tag-danger"
                >
                    Notes
                </span>
            </h2>
            <p>
                When designing 3D assets plan ahead, so that they have their
                origins in the correct places for animations.
            </p>
            <p>
                The article complained about how the model has transformations
                applied to its scale, rotation, and position values. Poor guy
                had to come up with hacks to get the cars to animate correctly
                because of this.
            </p>
        </div>
    );
};

function canvasApp(canvasRef: HTMLCanvasElement) {
    const canvas = canvasRef;
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const scene = new THREE.Scene();

    const fov = 45;
    const aspect = 1;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(1, 1, 2);

    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(hemiLight);

    let cars;
    const gltfLoader = new GLTFLoader();
    const url =
        "./src/assets/models/cartoon_lowpoly_small_city_free_pack/scene.gltf";
    gltfLoader.load(url, (gltf) => {
        const root = gltf.scene;
        root.scale.set(0.001, 0.001, 0.001);
        scene.add(gltf.scene);
        cars = root.getObjectByName("Cars");
        console.log(dumpObject(root).join("\n"));
    });

    const controls = new OrbitControls(camera, canvas);
    controls.update();

    function render(time: number) {
        time *= 0.001;

        if (cars) {
            for (const car of cars.children) {
                car.rotation.y = time;
            }
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function dumpObject(obj, lines: string[] = [], islast = true, prefix = "") {
    const localPrefix = islast ? "⨽" : "⊦";
    lines.push(
        `${prefix}${prefix ? localPrefix : ""}${obj.name || "*no-name*"} [${obj.type}]`
    );
    const newPrefix = prefix + (islast ? " " : "|");
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
        const isLast = ndx === lastNdx;
        dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
}

const code_block = stripIndent`
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

    let cars;

    const gltfLoader = new GLTFLoader();
    const url = "path/to/model";

    gltfLoader.load(url, (gltf) => {
        const root = gltf.scene;
        root.scale.set(0.001, 0.001, 0.001);
        scene.add(gltf.scene);
        cars = root.getObjectByName("Cars");
        console.log(dumpObject(root).join("\\n"));
    });
`;
