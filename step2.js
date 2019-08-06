const canvas = document.getElementById("step2");
const ctx = canvas.getContext("2d");

//Ball properties
const ballRadius = 10;

let ballX = canvas.width / 2;
const ballDX = 3;

let ballMove = false;

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
			ballX = ballRadius; //Prevents the ball from going past the boarder. Since ball is drawn from the center, we need to compensate by adding the ball radius to x at 0.
		} else {
			ballX -= ballDX;
		}
	} else if (ballMove === "right") {
		if (ballX + ballDX > canvas.width - ballRadius) {
			ballX = canvas.width - ballRadius; //Prevents the ball from going past the boarder. Since the ball is drawn from the center, we need to compensate by subtracting the ball from the full width of the canvas.
		} else {
			ballX += ballDX;
		}
	}
}

//The function used to draw the ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(ballX, 100, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

window.addEventListener("keydown", handleKeyPress); //Tells the computer to listen for any events involving pressing a keybaord key
window.addEventListener("keyup", handleKeyUp); //Tells the computer to listen for any events involving lifting a keyboard key

function drawCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();

	calcBallMove();

	// window.requestAnimationFrame(drawCanvas); //Paints the draw function every frame.
}
// window.requestAnimationFrame(drawCanvas); //Paints the draw function every frame.

export default drawCanvas;
