const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let count = 0;

const pipeInit = {
	x: canvas.width,
	width: 75,
	velocityX: 3
};

let pipes = [];

function generatePipeSet() {
	let newSet = [];

	const pipe1Height = 30 + Math.random() * 420;
	const pipe2Height = canvas.height - pipe1Height - 150;

	newSet.push({
		y: 0,
		height: pipe1Height,
		...pipeInit
	});

	newSet.push({
		y: canvas.height - pipe2Height,
		height: pipe2Height,
		x: canvas.width,
		width: 75,
		velocityX: 3
	});

	pipes.push(newSet);
}

function movePipes() {
	for (let i = 0; i < pipes.length; i++) {
		const set = pipes[i];
		const firstPipe = set[0];
		const secondPipe = set[1];

		if (i === 0) {
			if (firstPipe.x + firstPipe.width < 0) {
				pipes.shift();
			}
		}

		firstPipe.x -= firstPipe.velocityX;
		secondPipe.x -= firstPipe.velocityX;
	}
}

function counter() {
	if (count !== 90) {
		count++;
	} else {
		count = 0;
		generatePipeSet();
	}
}

function drawPipe() {
	for (let i = 0; i < pipes.length; i++) {
		const set = pipes[i];
		const firstPipe = set[0];
		const secondPipe = set[1];

		ctx.beginPath();
		ctx.rect(firstPipe.x, firstPipe.y, firstPipe.width, firstPipe.height);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();

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
