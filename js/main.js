importScript("js/view/cursor.js");

var canvas = null;
var canvasDimension = null;
var ctx = null;
var cursorView = null;
var cursorX = 0;
var cursorY = 0;
var i = 0;
var tmp = 0;

window.onload = function () {
	// Hide system cursor
	document.getElementById('canvas').style.cursor = 'none';
	// Declare Instances
	canvas = document.getElementById("canvas");
	canvasDimension = canvas.getBoundingClientRect();
	ctx = canvas.getContext("2d");
	cursorView = new CursorView(30);

	tick();
}

// Events

document.onmousemove = function (e) {
	ctx.clearRect(0,0,1000,600);
	cursorX = e.pageX - canvasDimension.left;
	cursorY = e.pageY - canvasDimension.top;
	cursorView.move(cursorX, cursorY);
}

function tick () {

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
