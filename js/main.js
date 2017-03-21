importScript("js/view/cursor.js");
importScript("js/playerControler.js");

var canvas = null;
var canvasDimension = null;
var ctx = null;

var playerControler = null;

// View vars
var cursorView = null;

// Event vars
var cursorX = 0;
var cursorY = 0;

var leftPush = false;
var rightPush = false;
var upPush = false;
var downPush = false;

window.onload = function () {

	// Hide system cursor
	document.getElementById('canvas').style.cursor = 'none';

	// Declare Instances
	canvas = document.getElementById("canvas");
	canvasDimension = canvas.getBoundingClientRect();
	ctx = canvas.getContext("2d");

	//// View instances
	cursorView = new CursorView(30);

	// Init controlers
	playerControler = new PlayerControler();

	tick();
}

// Events

document.onmousemove = function (e) {
	cursorX = e.pageX - canvasDimension.left;
	cursorY = e.pageY - canvasDimension.top;
}

document.onkeyup = function (e) {
	if (e.which == 65) leftPush = false;
	else if (e.which == 68) rightPush = false;

	if (e.which == 87) upPush = false;
	else if (e.which == 83) downPush = false;
}

document.onkeydown = function (e) {
	if (e.which == 65) leftPush = true;
	else if (e.which == 68) rightPush = true;

	if (e.which == 87) upPush = true;
	else if (e.which == 83) downPush = true;
}

function tick () {
	ctx.clearRect(0,0,1000,600);

	playerControler.tick();

	// View
	cursorView.move(cursorX, cursorY);

	window.requestAnimationFrame(tick);
}

// Add Scripts to index.html
function importScript ( url ) {
	var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
	head.appendChild(script);
}
