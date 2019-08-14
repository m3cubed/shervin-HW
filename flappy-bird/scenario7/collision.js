import { bird } from "./bird.js";
import { pipes } from "./pipe.js";

const canvas = document.getElementById("screen");

function collisionDetection() {
	//If the bird has hit the floor or ceiling
	if (bird.y < 0) {
		//Ceiling
		return true; //This value will be used to for a variable that states if the bird has collided.
	} else if (bird.y + bird.height > canvas.height) {
		//Floor
		return true; //This value will be used to for a variable that states if the bird has collided.
	}

	//If the bird has hit the pipes
	for (let i = 0; i < pipes.length; i++) {
		//Loop through all the pipes.
		const firstPipe = pipes[i][0];
		const secondPipe = pipes[i][1];

		if (
			bird.x + bird.width >= firstPipe.x &&
			bird.x <= firstPipe.x + firstPipe.width &&
			bird.y <= firstPipe.height
		) {
			return true; //This value will be used to for a variable that states if the bird has collided.
		} else if (
			bird.x + bird.width >= secondPipe.x &&
			bird.x <= secondPipe.x + secondPipe.width &&
			bird.y + bird.height >= secondPipe.y
		) {
			return true; //This value will be used to for a variable that states if the bird has collided.
		}
	}

	return false;
}

export default collisionDetection;
