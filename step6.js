const canvas = document.getElementById("step6");
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
const gravity = 9.8;
let ballFallSpeed = 0; //The vertical speed of the ball will be changed by gravity

let onRect = true;
let fallDX = 0;
let startFall; //Here, we're declaring a variable but we didn't put any properties into it. The variable will used later and the functions that will be using this variable requires this variable to be on the global scale i.e. on the very outside.

//Calculate the ball vertical speed
function calculateBallYSpeed() {
	ballFallSpeed = ballFallSpeed + gravity * (1 / 60); //This is basically the v = v0 + at equation. Time is 1/60 because it's 60 fps. Since we're calling this function every 1/60 of a second, we should multiply it by such amount.
	//The above equation is essentially Vf = V0 + a*t where t is the time it takes between each frame.

	if (ballFallSpeed > 40) {
		clearInterval(startFall); //This clears the calculation because it will keep going forever and that is a lot of computing power to waste. 20 is just an arbitary number.
	}
}

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
	if (onRect === true) {
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
			ballX <
			canvas.width / 2 - rectW / 2 /*If the ball has fallen on the left side*/
		) {
			fallDX = -ballDX;
			onRect = false;
			startFall = setInterval(calculateBallYSpeed, 1000 / 60); //This sets a command to run a specified function every frame, assuming 60fps.
		} else if (
			ballX >
			canvas.width / 2 + rectW / 2 /*If the ball has fallen the right side*/
		) {
			fallDX = ballDX;
			onRect = false;
			startFall = setInterval(calculateBallYSpeed, 1000 / 60); //This sets a command to run a specified function every frame, assuming 60fps.
		}
	} else {
		//If the ball is off the rectangle X movement should be constant
		ballX += fallDX;
	}
}

function calcBallY() {
	//Y movement. Only works when the ball is off the rectangle.
	if (onRect === false) {
		ballY += ballFallSpeed / 2;
		//This equation is essentially d = (Vf + V0)/2. This might not be physics class friendly but it's the fastest in terms of computation because of the easy calculations. Other equations would require the use of exponents which would slow down the calculations. At the end of the day, games shouldn't lag.
	}
}

function calcBallMove() {
	//Call both functions

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
		ctx.fillStyle = "blue";
		if (fallDX < 0) {
			ctx.fillText("Left Side", 10, 40);
		} else {
			ctx.fillText("Right Side", 10, 40);
		}
	}

	ctx.fillStyle = "black";
	ctx.fillText(
		"Current vertical speed: " +
			Math.floor(ballFallSpeed * 100) / 100 +
			" px/sec",
		10,
		60
	);
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
