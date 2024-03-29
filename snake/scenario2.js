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
	y: gridSize * 3,
	velocity: gridSize, //Since it moves at the same speed no matter what but we want to move it via a grid.
	direction: "down",
	directionChange: false
};

function handleKeyDown(event) {
	switch (event.key) {
		case "ArrowUp": {
			if (snake.direction !== "down") {
				if (snake.direction !== "up") {
					snake.directionChange = true;
				}
				snake.direction = "up";
			}
			break;
		}
		case "ArrowDown": {
			if (snake.direction !== "up") {
				if (snake.direction !== "down") {
					snake.directionChange = true;
				}
				snake.direction = "down";
			}
			break;
		}
		case "ArrowLeft": {
			if (snake.direction !== "right") {
				if (snake.direction !== "left") {
					snake.directionChange = true;
				}
				snake.direction = "left";
			}
			break;
		}
		case "ArrowRight": {
			if (snake.direction !== "left") {
				if (snake.direction !== "right") {
					snake.directionChange = true;
				}
				snake.direction = "right";
			}
			break;
		}
		default:
			return;
	}
}

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

	moveSnake();
}

function moveSnake() {
	switch (snake.direction) {
		case "up": {
			snake.y -= snake.velocity; //Changes direction
			break;
		}
		case "down": {
			snake.y += snake.velocity; //Changes direction
			break;
		}
		case "left": {
			snake.x -= snake.velocity; //Changes direction
			break;
		}
		case "right": {
			snake.x += snake.velocity; //Changes direction
			break;
		}
		default:
			return;
	}
}

window.addEventListener("keydown", handleKeyDown);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	drawSnake();
	window.requestAnimationFrame(draw);
}

draw();
