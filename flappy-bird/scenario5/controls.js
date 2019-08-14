import { jump } from "./bird.js";

function handleKeyDown(event) {
	//Since in flappy bird there is only one button being pressed there's no point using a switch-case statement
	if (event.key === " ") {
		jump(true);
	}
}

function handleKeyUp(event) {
	if (event.key === " ") {
		jump(false);
	}
}

export { handleKeyDown, handleKeyUp }; //Notice here, we are exporting more than one thing. So we won't use "export default" and we put the items we export in {}
