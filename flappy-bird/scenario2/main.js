//Imports MUST be at the top of the script page
import drawBird from "./bird.js"; //Import only one item in a file with "export default"

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBird();
	window.requestAnimationFrame(draw);
}

draw();
