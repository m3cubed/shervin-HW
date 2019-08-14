const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const bird = {
	x: 175, //starting a bit away from the left of the screen
	y: canvas.height / 2 - 15, //starting in the middle of the screen
	width: 50,
	height: 30
};

function drawBird() {
	ctx.beginPath();
	ctx.rect(bird.x, bird.y, bird.width, bird.height);
	ctx.fillStyle = "orange";
	ctx.fill();
	ctx.closePath();
}

export default drawBird; /*Here we are export the function for use in a different file. This is help clutteredness. 
We are using "export default" here because we are only exporting  one thing. If we are export multiple things we would use only "export" */
