let currentScreen = 1;

function removeScript(difference) {
	const prevScript = document.getElementById("screen-script");
	document.body.removeChild(prevScript);
	currentScreen += difference;
	handleScreen();
}

function handleButtonPress(button) {
	switch (button) {
		case "next": {
			removeScript(1);
			break;
		}
		case "prev": {
			removeScript(-1);
			break;
		}
		default:
			return;
	}
}

function handleScreen() {
	const el = document.createElement("script");
	el.id = "screen-script";
	el.type = "module";
	el.src = "./scenario" + currentScreen + "/main.js";
	document.body.appendChild(el);
}

handleScreen();
