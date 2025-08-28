import RAPIER from "@dimforge/rapier2d";
import Mover from "./mover";
import "./eventListeners.js";

export let keysPressed = {};

export default (c: HTMLCanvasElement) => {
    const graphics = c.getContext("2d")!;
    const physics = new RAPIER.World({ x: 0, y: 0 });
    const eventQueue = new RAPIER.EventQueue(true);

    const startGameLoop = createAnimationLoop(graphics, physics, eventQueue);

    requestAnimationFrame(startGameLoop);
};

class World {
    barrenRoom: BarrenRoom;
    graphics: CanvasRenderingContext2D;

    constructor(graphics: CanvasRenderingContext2D, physics: RAPIER.World) {
        this.barrenRoom = new BarrenRoom(graphics, physics);
    }

    display() {
        this.barrenRoom.display();
    }
}

class BarrenRoom {
    barrenRoom: HTMLImageElement;
    graphics: CanvasRenderingContext2D;
    physics: RAPIER.World;
    width = 180;
    height = 270;
    wallThickness = 5;
    rigidBodyDesc: RAPIER.RigidBodyDesc;
    rigidBody: RAPIER.RigidBody;
    topWallColliderDesc = RAPIER.ColliderDesc.cuboid(
        this.width / 2,
        this.wallThickness
    ).setTranslation(this.width / 2, this.wallThickness / 2);
    leftWallColliderDesc = RAPIER.ColliderDesc.cuboid(
        this.wallThickness,
        this.height / 2
    ).setTranslation(this.wallThickness / 2, this.height / 2)
    rightWallColliderDesc = RAPIER.ColliderDesc.cuboid(
        this.wallThickness,
        this.height / 2
    ).setTranslation(this.width - this.wallThickness / 2, this.height / 2)
    topWallCollider: RAPIER.Collider;
    leftWallCollider: RAPIER.Collider;
    rightWallCollider: RAPIER.Collider;

    constructor(graphics: CanvasRenderingContext2D, physics: RAPIER.World) {
        this.graphics = graphics;
        this.physics = physics;
        this.rigidBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(
            graphics.canvas.width / 2 - this.width / 2,
            graphics.canvas.height / 2 - this.height / 2
        );
        this.rigidBody = physics.createRigidBody(this.rigidBodyDesc);
        this.topWallCollider = physics.createCollider(
            this.topWallColliderDesc,
            this.rigidBody
        );
        this.leftWallCollider = physics.createCollider(
            this.leftWallColliderDesc,
            this.rigidBody
        )
        this.rightWallCollider = physics.createCollider(
            this.rightWallColliderDesc,
            this.rigidBody
        )
        this.barrenRoom = new Image();
        this.barrenRoom.src = "./src/assets/images/barrenRoom.png";
    }

    display() {
        this.graphics.drawImage(
            this.barrenRoom,
            this.graphics.canvas.width / 2 - this.width / 2,
            this.graphics.canvas.height / 2 - this.height / 2,
            this.width,
            this.height
        );
    }
}

function createAnimationLoop(
    graphics: CanvasRenderingContext2D,
    physics: RAPIER.World,
    eventQueue: RAPIER.EventQueue
) {
    const world = new World(graphics, physics);
    const mover = new Mover(graphics, { RAPIER, physics });

    console.log(physics.debugRender());

    return function animate() {
        graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);

        physics.step(eventQueue);

        world.display();

        mover.listenForInput();
        mover.update();
        mover.display();

        eventQueue.drainCollisionEvents((handle1, handle2, started) => {
            console.log(handle1, handle2, started);
        });

        const { vertices } = physics.debugRender();

        for (let i = 0; i < vertices.length; i += 4) {
            graphics.strokeStyle = "red";
            graphics.beginPath();
            graphics.moveTo(vertices[i], vertices[i + 1]);
            graphics.lineTo(vertices[i + 2], vertices[i + 3]);
            graphics.stroke();
            graphics.closePath();
        }

        requestAnimationFrame(animate);
    };
}
