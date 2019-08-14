//Imports MUST be at the top of the script page
import drawBird from "./bird.js"; //Import only one item in a file with "export default"
import { handleKeyDown, handleKeyUp } from "./controls.js"; //Import more than one item. ie. There's no "export default"

import drawPipe from "./pipe.js";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

//Adding our key listeners
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBird();
	drawPipe();
	window.requestAnimationFrame(draw);
}

draw();
