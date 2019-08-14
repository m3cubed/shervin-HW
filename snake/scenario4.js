const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let sectionsToAdd = 0; //This is just for testing

const gridSize = 25;
const frameRate = 1000 / 30; //1000ms/30 = 30fps. Since snake is an old game and we want the snake to slow down, the easiest way is to use a slower framerate.
let timeStamp = window.performance.now(); //This is the current time that has elapsed since the site started in milliseconds. We're going to use this to control our fps.

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

let snakeBody = []; //An array to store our snake's body

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

	drawBody();
	moveBody();
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

function growSnake() {
	if (snakeBody.length === 0) {
		//If the snake currently has no body
		snakeBody.push({ x: snake.x + gridSize, y: snake.y + gridSize }); //Add a section to the tail
	} else {
		const tail = snakeBody[snakeBody.length - 1];
		snakeBody.push({ x: tail.x + gridSize, y: tail.y + gridSize }); //Add a section to the tail
	}
}

function drawBody() {
	for (let i = 0; i < snakeBody.length; i++) {
		ctx.beginPath();
		ctx.rect(
			snakeBody[i].x,
			snakeBody[i].y,
			snakeSection.width,
			snakeSection.height
		);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
	}
}

function moveBody() {
	//Moving body is going to be a little different. Essentially, every section is going to go to where the next section up was. This means our for loop has to count backwards.

	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length !== 0) {
		//The if is to prevent the function from generating an extra section.
		snakeBody[0] = { x: snake.x, y: snake.y };
	}
}

window.addEventListener("keydown", handleKeyDown);

function gameEngine() {
	const update = window.requestAnimationFrame(draw); //We have moved this from the draw function to here. This is currently going to ask the browser to draw the new image. Below we are going to check if we should do that.
	let timeNow = window.performance.now(); //The current time.
	let accumulatedTime = timeNow - timeStamp; //How much time has passed since the previous frame.

	if (accumulatedTime < frameRate) {
		//If the allotted time for 30fps has not passed yet.
		window.cancelAnimationFrame(update);
		while (accumulatedTime < frameRate) {
			//This is called a while function. It will keep running until the conditions are met. In this case, if the time fits 30fps.
			timeNow = window.performance.now();
			accumulatedTime = timeNow - timeStamp;
		}
		window.requestAnimationFrame(draw);
	}
	timeStamp = timeNow;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	drawSnake();
	if (sectionsToAdd < 6) {
		growSnake();
		sectionsToAdd++;
	}

	gameEngine();
}
draw();
