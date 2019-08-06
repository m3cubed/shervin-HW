import drawCanvas1 from "./step1.js";
import drawCanvas2 from "./step2.js";
import drawCanvas3 from "./step3.js";
import drawCanvas4 from "./step4.js";
import drawCanvas5 from "./step5.js";
import drawCanvas6 from "./step6.js";

function drawCanvases() {
	drawCanvas1();
	drawCanvas2();
	drawCanvas3();
	drawCanvas4();
	drawCanvas5();
	drawCanvas6();

	window.requestAnimationFrame(drawCanvases);
}

drawCanvases();
