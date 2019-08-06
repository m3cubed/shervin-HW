const canvas = document.getElementById("step3");
const ctx = canvas.getContext("2d");

//Ball properties
const ballRadius = 10;

let ballX = canvas.width / 2;
const ballDX = 3;

let ballMove = false;

//Rectangle properties
const rectW = 200;
const rectH = 200;

const rectX = canvas.width / 2 - rectW / 2;
const rectY = 100;

//This function runs when a keyboard key is pressed
function handleKeyPress(event) {
	if (event.key === "a") {
		ballMove = "left";
	} else if (event.key === "d") {
		ballMove = "right";
	}
}

//This function runs when a keyboard key is lifts
function handleKeyUp(event) {
	if (event.key === "a") {
		ballMove = false;
	} else if (event.key === "d") {
		ballMove = false;
	}
}

//The function used to calculated the ball's movements
function calcBallMove() {
	if (ballMove === "left") {
		if (ballX - ballDX < ballRadius) {
			ballX = ballRadius;
		} else {
			ballX -= ballDX;
		}
	} else if (ballMove === "right") {
		if (ballX + ballDX > canvas.width - ballRadius) {
			ballX = canvas.width - ballRadius;
		} else {
			ballX += ballDX;
		}
	}
}

//The function used to draw the ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(ballX, rectY - ballRadius, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

//The function use to draw the rectangle
function drawRectangle() {
	ctx.beginPath();
	ctx.rect(rectX, rectY, rectW, rectH);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

window.addEventListener("keydown", handleKeyPress); //Tells the computer to listen for any events involving pressing a keybaord key
window.addEventListener("keyup", handleKeyUp); //Tells the computer to listen for any events involving lifting a keyboard key

function drawCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();
	drawRectangle();

	calcBallMove();

	// window.requestAnimationFrame(drawCanvas); //Paints the draw function every frame.
}
// window.requestAnimationFrame(drawCanvas); //Paints the draw function every frame.

export default drawCanvas;
