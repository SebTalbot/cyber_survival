// Import View
importScript("js/view.js");
// Import "Abstract" Classes
importScript("js/model/entities/entity.js");
importScript("js/model/entities/dynamicEntity.js");
importScript("js/model/entities/livingEntity.js");
// Import Models
importScript("js/model/map.js");
importScript("js/model/entities/player.js");
importScript("js/model/entities/projectile.js");

// Canvas vars
var canvas = null;
var canvasDimension = null;
var ctx = null;

// Model vars
var map = null;
var player = null;
var arrayProjectiles = [];

// View vars
var view = null;
var cursorView = null;

// Event vars
var cursorX = 0;
var cursorY = 0;
var ingameCursorX = 0;
var ingameCursorY = 0;

var mouseClick = false;

var leftPush = false;
var rightPush = false;
var upPush = false;
var downPush = false;

window.onload = function () {

	window.addEventListener("resize", resizeCanvas);

	// Hide system cursor
	document.getElementById('canvas').style.cursor = 'none';

	// Canvas Instances
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	resizeCanvas();

	// Model instances
	map = new Map(1);
	player = new Player(300,300,5,100,10,10);

	//// View instances
	view = new View(40);

	tick();
};

// Events ----------------------------------------------------------------------
document.onmousemove = function(e) {
	cursorX = e.pageX;
	cursorY = e.pageY;
	if(view !== null){
		ingameCursorX = cursorX + view.getDrawX();
		ingameCursorY = cursorY + view.getDrawY();
	}
};

document.onmousedown = function() {
	mouseClick = true;
};

document.onmouseup = function() {
	mouseClick = false;
};

document.onkeyup = function(e) {
	if (e.which == 65) leftPush = false;
	else if (e.which == 68) rightPush = false;

	if (e.which == 87) upPush = false;
	else if (e.which == 83) downPush = false;
};

document.onkeydown = function(e) {
	if (e.which == 65) leftPush = true;
	else if (e.which == 68) rightPush = true;

	if (e.which == 87) upPush = true;
	else if (e.which == 83) downPush = true;
};

// MAIN ------------------------------------------------------------------------
function tick() {
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	// Model
	player.tick();

	// View
	view.changeDrawPosition(player.getX(),
							player.getY(),
							cursorX, cursorY, ctx);


	view.drawMap(map.getNbTilesX(),map.getNbTilesY(),map.getArrayTiles());

	for(var i=0;i<arrayProjectiles.length;i++){
		if(arrayProjectiles[i].tick()){
			view.drawProjectile(arrayProjectiles[i].getX(),
								arrayProjectiles[i].getY());
		}
		else{
			arrayProjectiles.splice(i,1);
			i--;
		}
	}
	view.drawPlayer(player.getX(),player.getY());
	view.drawCursor(cursorX,cursorY);

	window.requestAnimationFrame(tick);
}
// Global functions ------------------------------------------------------------

// Resize Canvas on window event
function resizeCanvas() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}

// Add Scripts to index.html
function importScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
	document.head.appendChild(script);
}
