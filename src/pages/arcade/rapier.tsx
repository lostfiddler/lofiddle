import React, { useEffect, useRef } from "react";
import RAPIER from "@dimforge/rapier2d";

export default () => {
    let world = new RAPIER.World({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    useEffect(() => {
        const c = canvasRef.current! as HTMLCanvasElement;
        const ctx = c.getContext("2d")!;

        class Mover {
            position: { x: number; y: number };
            rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
                c.width / 2,
                c.height / 2
            );
            rigidBody = world.createRigidBody(this.rigidBodyDesc);
            colliderDesc = RAPIER.ColliderDesc.cuboid(5, 5);
            collider = world.createCollider(this.colliderDesc, this.rigidBody);

            constructor() {
                this.position = this.rigidBody.translation();
            }
        }

        const mover = new Mover();

        const { vertices, colors } = world.debugRender();

        for (let i = 0; i < vertices.length / 4; i += 1) {
            ctx.strokeStyle = `rgb(
                ${Math.floor(colors[i] * 255)},
                ${Math.floor(colors[i + 1] * 255)},
                ${Math.floor(colors[i + 2] * 255)}
            )`;
            ctx.beginPath();
            ctx.moveTo(vertices[i * 4], vertices[i * 4 + 1]);
            ctx.lineTo(vertices[i * 4 + 2], vertices[i * 4 + 3]);
            ctx.stroke();
            ctx.closePath();
        }
    });

    return (
        <div>
            <h1>Rapier</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};
