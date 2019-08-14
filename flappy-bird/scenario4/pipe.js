const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const pipe = {
	x: 500, //This is just temporary. It'll be changed later. We'll use this for now to visualize it.
	y: 0, //This is also just temporary.
	width: 75,
	height: 300, //Also temporary.
	velocityX: 3 //Technically the pipes don't "move". But for the purpose of the game, it's much easier to move them than the everything else all the time.
};

function movePipes() {
	pipe.x -= pipe.velocityX;
}

function drawPipe() {
	ctx.beginPath();
	ctx.rect(pipe.x, pipe.y, pipe.width, pipe.height);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();

	movePipes();
}

export default drawPipe;
