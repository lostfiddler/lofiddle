import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { CANVAS_WIDTH, CANVAS_WIDTH_RATIO } from "../../../constants";
import { stripIndent } from "common-tags";

export default () => {
    const canvasGLTFRef = useRef(null);

    useEffect(() => {
        if (!canvasGLTFRef.current!) {
            return;
        }
        canvasAppGLTF(canvasGLTFRef.current!);
    });

    return (
        <div>
            <h2>GLTF Animations</h2>
            <p>
                <a href="https://threejs.org/manual/#en/animation-system">
                    Manual
                </a>{" "}
                for further information.
            </p>
            <canvas ref={canvasGLTFRef}></canvas>
            <pre className="language-js">
                <code>{codeBlock}</code>
            </pre>
        </div>
    );
};

async function canvasAppGLTF(c: HTMLCanvasElement) {
    const canvas = c;

    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width / CANVAS_WIDTH_RATIO;

    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const scene = new THREE.Scene();

    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(2, 1, 6);

    const color = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(hemiLight);

    function loadAlien(url: string): Promise<GLTF> {
        return new Promise((resolve, reject) => {
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(
                url,
                (gltf) => {
                    resolve(gltf);
                },
                undefined,
                (error) => {
                    console.error(
                        "An error occurred while loading the GLTF model:",
                        error
                    );
                    reject(error);
                }
            );
        });
    }

    const url = "./src/assets/models/alien/Alien.gltf";
    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();
    try {
        const alienGltf: GLTF = await loadAlien(url);

        const root = alienGltf.scene;
        root.position.set(0, -1.5, 0);
        root.scale.set(1.5, 1.5, 1.5);
        scene.add(alienGltf.scene);

        mixer = new THREE.AnimationMixer(alienGltf.scene);

        const clips = alienGltf.animations;
        console.log(clips);
        const clip = THREE.AnimationClip.findByName(clips, "Dance");
        const action = mixer.clipAction(clip!);

        action.play();
    } catch (error) {
        console.error("Failed to load or set up alien:", error);
    }

    const controls = new OrbitControls(camera, canvas);
    controls.update();

    animate();
    function animate() {
        if (mixer) {
            mixer.update(clock.getDelta());
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}

const codeBlock = stripIndent`
    // ... setup scene

    let mixer = null;
    const clock = new THREE.Clock(); // To track time for mixer

    try {
        // ... load .gltf model asyncronously

        mixer = new THREE.AnimationMixer(alien.scene);
        // Get the list of AnimationClip instances
        const clips = alien.animations;

        // Play specific animation
        const clip = THREE.AnimationClip.findByName(clips, 'Dance')
        const action = mixer.clipAction(clip);
        action.play();
    } catch (error) {
        console.error("Failed to load or set up alien:", error);
    }

    function animate() {
        if (mixer) {
            mixer.update(clock.getDelta());
        }
        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }
    animate();
`;
