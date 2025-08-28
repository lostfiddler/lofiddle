import { keysPressed } from "./game";

addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }
    keysPressed[e.key] = true;
});
addEventListener("keyup", (e) => {
    keysPressed[e.key] = false;
});
