importScript("js/view/cursor.js");
importScript("js/model/camera.js");
importScript("js/playerControler.js");
importScript("js/mapControler.js");

var canvas = null;
var canvasDimension = null;
var ctx = null;

// Camera
var camera = null;

// Controlers
var playerControler = null;
var mapControler = null;

// View vars
var scale = 40;
var cursorView = null;

// Event vars
var cursorX = 0;
var cursorY = 0;

var leftPush = false;
var rightPush = false;
var upPush = false;
var downPush = false;

window.onload = function () {

	window.addEventListener("resize", resizeCanvas);

	// Hide system cursor
	document.getElementById('canvas').style.cursor = 'none';

	// Declare Instances
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	resizeCanvas();

	//// View instances
	camera = new Camera();
	cursorView = new CursorView(30);

	// Init controlers
	playerControler = new PlayerControler();
	mapControler = new MapControler();

	tick();
};

// Events

document.onmousemove = function (e) {
	cursorX = e.pageX;
	cursorY = e.pageY;
};

document.onkeyup = function (e) {
	if (e.which == 65) leftPush = false;
	else if (e.which == 68) rightPush = false;

	if (e.which == 87) upPush = false;
	else if (e.which == 83) downPush = false;
};

document.onkeydown = function (e) {
	if (e.which == 65) leftPush = true;
	else if (e.which == 68) rightPush = true;

	if (e.which == 87) upPush = true;
	else if (e.which == 83) downPush = true;
};

function tick () {
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	mapControler.tick();

	playerControler.tick();

	// View
	cursorView.move(cursorX, cursorY);
	camera.changePosition(playerControler.getPlayer().getX(),
						  playerControler.getPlayer().getY(),
						  cursorX, cursorY, ctx);
	window.requestAnimationFrame(tick);
}

function resizeCanvas() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}

// Add Scripts to index.html
function importScript ( url ) {
	var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
	head.appendChild(script);
}
