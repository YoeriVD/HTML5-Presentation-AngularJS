var smile = true;

window.onload = function() {

	var canvas = document.getElementById("myCanvas");
	var status = document.getElementById("status");
	status.innerHTML = "document loaded, starting to draw!";
	happyFace(canvas, smile);
	status.innerHTML = "READY!";
	var toggle = document.getElementById("toggle");
	toggle.addEventListener("click", function() {
		if (smile) {
			this.innerHTML = "Ol raajt ol raajt ... shmile again!";
		} else {
			this.innerHTML = "STOP SMILING YA WANKER!"
		}
		smile = !smile;
		happyFace(canvas, smile);
	});


}


function draw(canvas) {
	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "red";

	//start drawing
	ctx.beginPath();
	//move away from corner
	ctx.moveTo(30, 30);
	//draw line from where we are now to this point
	ctx.lineTo(150, 150);
	//draw curved line
	ctx.bezierCurveTo(60, 70, 60, 70, 70, 150);
	//close drawing
	ctx.lineTo(30, 30);
	//fill the drawing
	ctx.fill();
	//draw the lines
	ctx.stroke();

}

function drawISLogo(canvas) {
	canvas.setAttribute('width', '457');
	canvas.setAttribute('height', '167');
	var ctx = canvas.getContext("2d");

	ctx.strokeStyle = "#0081BD";
	ctx.fillStyle = "#0081BD";
	ctx.lineWidth = 6;

	ctx.beginPath();
	ctx.moveTo(67, 125);
	ctx.lineTo(170, 125);
	ctx.bezierCurveTo(180, 121, 186, 116, 189, 110);
	ctx.bezierCurveTo(187, 60, 197, 47, 216, 40);
	ctx.lineTo(456, 40);
	ctx.lineTo(452, 57);
	ctx.lineTo(219, 57);
	ctx.bezierCurveTo(206, 63, 203, 78, 208, 92);
	ctx.bezierCurveTo(208, 108, 197, 130, 177, 142);
	ctx.lineTo(64, 142);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();

}

function happyFace(canvas, isHappy) {
	var ctx = canvas.getContext("2d");

	//head
	ctx.fillStyle = "yellow";
	ctx.beginPath();
	ctx.arc(140, 75, 65, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	//left eye
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(110, 45, 10, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
	//right eye
	ctx.beginPath();
	ctx.arc(165, 45, 10, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
	//mouth
	ctx.beginPath();
	ctx.arc(137, 90, 25, 0, Math.PI, !isHappy);
	ctx.closePath();
	ctx.fill();
}

function yenthe(canvas) {

	// Set the height en width of your drawing canvas
	canvas.setAttribute('width', '457');
	canvas.setAttribute('height', '167');

	// Define which context you need to draw, 2d or 3d
	var c2 = canvas.getContext('2d');

	// Define the color
	c2.fillStyle = '#0081BD';

	// To draw call beginPath and endPath and move your pen in between the calls
	//draw the small part of the S
	c2.beginPath();
	c2.moveTo(5, 125);
	c2.lineTo(33, 125);
	c2.lineTo(28, 143);
	c2.lineTo(0, 143);
	c2.closePath();
	// after close path you can fill or stroke
	c2.fill();

	//draw the long part of the I
	c2.beginPath();
	c2.moveTo(34, 154);
	c2.lineTo(53, 64);
	c2.lineTo(71, 64);
	c2.lineTo(52, 154);
	c2.closePath();
	c2.fill();

	//draw the dot on the I
	c2.beginPath();
	c2.moveTo(55, 57);
	c2.lineTo(59, 40);
	c2.lineTo(77, 40);
	c2.lineTo(73, 57);
	c2.closePath();
	c2.fill();

	//draw the big part of the S
	c2.beginPath();
	c2.moveTo(67, 125);
	c2.lineTo(170, 125);
	c2.bezierCurveTo(180, 121, 186, 116, 189, 110);
	c2.bezierCurveTo(187, 60, 197, 47, 216, 40);
	c2.lineTo(456, 40);
	c2.lineTo(452, 57);
	c2.lineTo(219, 57);
	c2.bezierCurveTo(206, 63, 203, 78, 208, 92);
	c2.bezierCurveTo(208, 108, 197, 130, 177, 142);
	c2.lineTo(64, 142);
	c2.closePath();
	c2.fill();
};
