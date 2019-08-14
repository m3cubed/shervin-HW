const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const snakeSection = {
	width: 20,
	height: 20
};

let snake = {
	x: canvas.width / 2 - snakeSection.width / 2,
	y: canvas.height / 2 - snakeSection.height / 2
};

function drawSnake() {
	ctx.beginPath();
	ctx.rect(snake.x, snake.y, snakeSection.width, snakeSection.height);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	window.requestAnimationFrame(draw);
}

draw();
