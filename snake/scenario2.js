const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

//We're seperating the dimensions with the position because there's going to be multiple sections
const snakeSection = {
	width: 10,
	height: 10
};

let snake = {
	x: canvas.width / 2 - snakeSection.width / 2,
	y: canvas.height / 2 - snakeSection.height / 2,
	velocity: snakeSection.width, //Since it moves at the same speed no matter what but we want to move it via a grid.
	moveUp: false,
	moveDown: false,
	moveLeft: false,
	moveRight: false
};

function handleKeyDown(event) {
	switch (event.key) {
		case "ArrowUp": {
			snake.moveUp = true;
			break;
		}
		case "ArrowDown": {
			snake.moveDown = true;
			break;
		}
		case "ArrowLeft": {
			snake.moveLeft = true;
			break;
		}
		case "ArrowRight": {
			snake.moveRight = true;
			break;
		}
		default:
			return;
	}
}

function handleKeyUp(event) {
	switch (event.key) {
		case "ArrowUp": {
			snake.moveUp = false;
			break;
		}
		case "ArrowDown": {
			snake.moveDown = false;
			break;
		}
		case "ArrowLeft": {
			snake.moveLeft = false;
			break;
		}
		case "ArrowRight": {
			snake.moveRight = false;
			break;
		}
		default:
			return;
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
	if (snake.moveUp) {
		snake.y -= snake.velocity;
	} else if (snake.moveDown) {
		snake.y += snake.velocity;
	} else if (snake.moveLeft) {
		snake.x -= snake.velocity;
	} else if (snake.moveRight) {
		snake.x += snake.velocity;
	}
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	window.requestAnimationFrame(draw);
}

draw();
