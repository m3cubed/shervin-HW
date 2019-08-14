import { pipes } from "./pipe.js";
import { bird } from "./bird.js";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let score = 0;

function passedPipe() {
	for (let i = 0; i < pipes.length; i++) {
		const set = pipes[i];
		const firstPipe = set[0]; //We just need the first pipe since both pipes in a set has the same x.

		if (
			bird.x + bird.width >= firstPipe.x + firstPipe.width / 2 &&
			bird.x + bird.width <=
				firstPipe.x + firstPipe.width / 2 + firstPipe.velocityX //This basically creates a thin line to detect if the bird has passed the pipe.
		) {
			return 1;
		}
	}

	return 0;
}

function updateScore() {
	score += passedPipe(); //Basically checks if the score should increase or not
}

function drawScore() {
	//Draw the scoreboard
	ctx.font = "bold 30px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(score, 20, 50);
	ctx.strokeText(score, 20, 50);
}

export { drawScore, updateScore };
