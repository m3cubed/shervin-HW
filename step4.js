const canvas = document.getElementById("step4");
const ctx = canvas.getContext("2d");

//Ball properties
const ballRadius = 10;

let ballX = canvas.width / 2;
let ballY = 100 - ballRadius;
const ballDX = 3;

let ballMove = false;

//Rectangle properties
const rectW = 200;
const rectH = 200;

const rectX = canvas.width / 2 - rectW / 2;
const rectY = 100;

//Game logic
const gravity = 5;
let onRect = true;

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

//The following functions are used to calculated the ball's movements

function calcBallX() {
	//X movement
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
	//This will run after the ball moves horizontally to check if it's still on the rectangle.
	if (
		ballX < canvas.width / 2 - rectW / 2 ||
		ballX > canvas.width / 2 + rectW / 2
	) {
		onRect = false;
	}
}

function calcBallY() {
	//Y movement. Only works when the ball is off the rectangle.
	if (onRect === false) {
		ballY += gravity;
	}
}

function calcBallMove() {
	calcBallX();
	calcBallY();
}

//The function used to draw the ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
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

//The function draws a text to show whether or not the ball is on the rectangle. You don't need this.
function onRectText() {
	ctx.font = "15px Arial";
	if (onRect === true) {
		ctx.fillStyle = "green";
		ctx.fillText("On Table", 10, 20);
	} else {
		ctx.fillStyle = "red";
		ctx.fillText("Off Table", 10, 20);
	}
}

window.addEventListener("keydown", handleKeyPress); //Tells the computer to listen for any events involving pressing a keybaord key
window.addEventListener("keyup", handleKeyUp); //Tells the computer to listen for any events involving lifting a keyboard key

function drawCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();
	drawRectangle();
	onRectText(); //This is just to help you. You don't need this in your work.

	calcBallMove();

	// window.requestAnimationFrame(drawCanvas); //Paints the draw function every frame.
}
// window.requestAnimationFrame(drawCanvas); //Paints the draw function every frame.

export default drawCanvas;
