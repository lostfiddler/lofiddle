import RAPIER from "@dimforge/rapier2d";
import { vec2 } from "gl-matrix";
import { keysPressed } from "./game";

type RAPIER_API = typeof import("@dimforge/rapier2d");

export default class Mover {
    graphics: CanvasRenderingContext2D;
    RAPIER: RAPIER_API;
    physics: RAPIER.World;
    rigidBodyDesc: RAPIER.RigidBodyDesc;
    rigidBody: RAPIER.RigidBody;
    colliderBodyDesc: RAPIER.ColliderDesc;
    collider: RAPIER.Collider;
    velocity: vec2;
    acceleration: vec2;

    constructor(
        graphics: CanvasRenderingContext2D,
        physics: { RAPIER: RAPIER_API; physics: RAPIER.World }
    ) {
        this.graphics = graphics;
        this.RAPIER = physics.RAPIER;
        this.physics = physics.physics;
        this.rigidBodyDesc = this.RAPIER.RigidBodyDesc.dynamic().setTranslation(
            50,
            100
        );
        this.rigidBody = this.physics.createRigidBody(this.rigidBodyDesc);
        this.colliderBodyDesc = this.RAPIER.ColliderDesc.cuboid(
            10,
            10
        ).setActiveEvents(this.RAPIER.ActiveEvents.COLLISION_EVENTS);
        this.collider = this.physics.createCollider(
            this.colliderBodyDesc,
            this.rigidBody
        );
        this.velocity = vec2.create();
        this.acceleration = vec2.create();
    }

    display() {
        this.graphics.fillRect(
            this.rigidBody.translation().x - 10,
            this.rigidBody.translation().y - 10,
            this.collider.halfExtents().x * 2,
            this.collider.halfExtents().y * 2
        );
    }

    update() {
        const position = vec2.fromValues(
            this.rigidBody.translation().x,
            this.rigidBody.translation().y
        );
        vec2.add(this.velocity, this.velocity, this.acceleration);
        vec2.add(position, position, this.velocity);

        this.rigidBody.setTranslation({ x: position[0], y: position[1] }, true);

        vec2.zero(this.acceleration);
        vec2.zero(this.velocity);
    }

    listenForInput() {
        if (keysPressed["ArrowUp"]) {
            this.acceleration[1] = -3;
        }
        if (keysPressed["ArrowDown"]) {
            this.acceleration[1] = 3;
        }
        if (keysPressed["ArrowLeft"]) {
            this.acceleration[0] = -3;
        }
        if (keysPressed["ArrowRight"]) {
            this.acceleration[0] = 3;
        }
    }
}
