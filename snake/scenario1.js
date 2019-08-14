const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const gridSize = 25;

//We're seperating the dimensions with the position because there's going to be multiple sections
const snakeSection = {
	width: gridSize,
	height: gridSize
};

let snake = {
	x: gridSize * 3,
	y: gridSize * 3
};

function drawGrid() {
	//We're going to make a function that draws a grid for us so it's easier to visualize the movements. This will be removed at the end

	//Vertical lines
	for (let i = 0; i < canvas.width; i += gridSize) {
		ctx.beginPath();
		ctx.moveTo(i, 0); //Starting coordinates
		ctx.lineTo(i, canvas.height); //Ending coordinates
		ctx.stroke();
		ctx.closePath();
	}
	//Horizontal lines
	for (let i = 0; i < canvas.height; i += gridSize) {
		ctx.beginPath();
		ctx.moveTo(0, i); //Starting coordinates
		ctx.lineTo(canvas.width, i); //Ending coordinates
		ctx.stroke();
		ctx.closePath();
	}
}

function drawSnake() {
	ctx.beginPath();
	ctx.rect(snake.x, snake.y, snakeSection.width, snakeSection.height);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	drawSnake();
	window.requestAnimationFrame(draw);
}

draw();
