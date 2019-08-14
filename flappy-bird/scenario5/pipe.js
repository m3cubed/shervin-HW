const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let count = 0; //This is variable is going to be for counting until we generate another set of pipes

const pipeInit = {
	//the initialization information for the pipes
	x: canvas.width, //The pipes start at the very right of the screen
	width: 75,
	velocityX: 3 //Technically the pipes don't "move". But for the purpose of the game, it's much easier to move them than the everything else all the time.
};

let pipes = []; //Make an array that is going to hold all the information for our pipes. This is just an empty array. It will be populated using the following function.

function generatePipeSet() {
	//We're going to make a function which generates the pipes for us. No point manually generating the information when we have a computer!
	let newSet = []; //We're going to use an array because there will be two pipes each set. This is currently an empty array which we will populate in this function.

	//Math.Random generates a random number between 0 and 1. Essentially a percentage.
	const pipe1Height = 30 + Math.random() * 420; //Here I'm saying the first pipe can have a random length between 30px to 450px.
	const pipe2Height = canvas.height - pipe1Height - 180; //Generating the height for the second pipe. The 180 is the gap for the bird to flap through.

	newSet.push({
		//.push adds information to our array. The curly braces {} is because the information we're adding is an object.
		y: 0, //The first pipe starts from the top,
		height: pipe1Height,
		...pipeInit //This here called an "object spread" it basically adds the information from another object. In this case our pipeInit const. If you're confused take a look at the next push. It has the same effect.
	});

	newSet.push({
		//pushing the second pipe
		y: canvas.height - pipe2Height, //Pipe 2 starts from it's height
		height: pipe2Height,
		//Below is the information I copied from the constant "pipeInit". This the exact same thing as the object spread above.
		x: canvas.width, //The pipes start at the very right of the screen
		width: 75,
		velocityX: 3 //Technically the pipes don't "move". But for the purpose of the game, it's much easier to move them than the everything else all the time.
	});

	pipes.push(newSet); //We're now pushing our new set of pipes to our existing set of pipes
}

function movePipes() {
	//This function will change the x values of our pipes. ie. move them.
	//Currently, the pipes variable should look something like this: [[{pipe1},{pipe2}],[{pipe1},{pipe2}],...]
	for (let i = 0; i < pipes.length; i++) {
		//Looping through all the pipe sets
		const set = pipes[i]; //The current set of pipes. Remember, there are two in each set.
		const firstPipe = set[0]; //These two variables usually isn't needed but I'm expressing them with hope that it may help you visualize what is happening. This part can be confusing.
		const secondPipe = set[1];

		if (
			i ===
			0 /*We're going to check if the front most set of pipes have left the screen so we can delete them.*/
		) {
			if (firstPipe.x + firstPipe.width < 0) {
				pipes.shift(); //.shift removes the first item in an array
			}
		}

		firstPipe.x -= firstPipe.velocityX; //We're gonna move the pipes by changing their x valeus
		secondPipe.x -= firstPipe.velocityX;
	}
}

function counter() {
	if (count !== 90) {
		//This is just an arbiturary number of counts until the next set of pipes appear
		count++;
	} else {
		count = 0;
		generatePipeSet();
	}
}

function drawPipe() {
	for (let i = 0; i < pipes.length; i++) {
		//Loop through the set of pipes to draw them
		const set = pipes[i];
		const firstPipe = set[0];
		const secondPipe = set[1];

		//Draw the first pipe
		ctx.beginPath();
		ctx.rect(firstPipe.x, firstPipe.y, firstPipe.width, firstPipe.height);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();

		//Draw the second pipe
		ctx.beginPath();
		ctx.rect(secondPipe.x, secondPipe.y, secondPipe.width, secondPipe.height);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
	}
	counter();
	movePipes();
}

export default drawPipe;
