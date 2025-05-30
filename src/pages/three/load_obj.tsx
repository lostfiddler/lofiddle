import React, { useRef, useEffect } from "react";
import GUI from "lil-gui";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasApp(canvasRef.current!);
    }, []);

    return (
        <div>
            <h1>Loading an .obj File</h1>
            <p>
                <a href="https://threejs.org/manual/#en/load-obj">Link</a> to
                manual
            </p>
            <div id="canvas-container">
                <canvas ref={canvasRef} width="524" height="500"></canvas>
            </div>
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

    const color = 0xffffff;
    const intensity = 1;
    const dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(0, 10, 0);
    dirLight.target.position.set(-5, 0, 0);
    scene.add(dirLight);
    scene.add(dirLight.target);

    const skycolor = 0xb1e1ff;
    const groundcolor = 0xb97a20;
    const hemiLight = new THREE.HemisphereLight(skycolor, groundcolor, 1);
    scene.add(hemiLight);

    camera.position.set(0, 10, 20);

    // checkerboard texture
    const planeSize = 40;
    const loader = new THREE.TextureLoader();
    const texture = loader.load("./src/assets/images/checker.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    // plane geometry
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);

    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    mtlLoader.load("./src/assets/models/windmill/windmill_001.mtl", (mtl) => {
        mtl.preload();
        mtl.materials.Material.side = THREE.DoubleSide;
        objLoader.setMaterials(mtl);
        objLoader.load("./src/assets/models/windmill/windmill_001.obj", (root) => {
            scene.add(root);
        });
    });

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const gui = new GUI({ container: canvas.parentElement! });
    gui.addColor(new ColorGUIHelper(hemiLight, "color"), "value").name(
        "skyColor"
    );
    gui.addColor(new ColorGUIHelper(hemiLight, "groundColor"), "value").name(
        "groundColor"
    );
    gui.add(hemiLight, "intensity", 0, 5, 0.01);
    canvas.after(gui.domElement);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
}

class ColorGUIHelper {
    object: object;
    prop: string;

    constructor(object: object, prop: string) {
        this.object = object;
        this.prop = prop;
    }

    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }

    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}
