window.onload = start;
var shapes = new Array();
var random = Math.random;
var score = 0;
var text = "";
var clock = "";
var round = 20;
var inter;

function start() {
	jc.start("drawingCanvas", 380);
	text = jc.text('score: ' + score, 15, 15);
	text.font('20px Times New Roman');
	clock = jc.text(round / 2, 780, 390);
	clock.font('20px Times New Roman');
	var millisecondsToWait = 500;
	inter = setInterval(nextRound, millisecondsToWait);
}

function nextRound() {
	round--;
	if (round % 2 == 0) {
		clock.string(round / 2);
	}
	if (round == 0) {
		endGame();
	} else {
		draw();
	}
}

function draw() {
	var shape = jc.circle(random() * 800, random() * 400, random() * 10, randomRgba(), 1);
	shape.click(destroy);
	shape.animate({
		x : random() * 800,
		y : random() * 400,
		radius : random() * 100
	}, random() * 2000);
}

function endGame() {    
    clearInterval(inter);
    jc.clear();
	jc.start("drawingCanvas", true);
	var final = jc.text('final score: ' + score, 320, 200);
	final.font('40px Times New Roman');
}

function destroy() {
	var self = this;
	score += Math.round(100 - self._radius);
	text.string('score: ' + score);
	self.stop();
	self.color('#ff0000');
	self.animate({
		radius : 0
	}, 1000, function() {
		self.del();
	});
}

function randomRgba() {
	return 'rgba(' + random() * 255 + ',' + random() * 255 + ',' + random() * 255 + ', 0.5)';
}
