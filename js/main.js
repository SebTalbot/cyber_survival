// Canvas vars
var canvas = null;
var canvasDimension = null;
var ctx = null;

// Model vars
var map = null;
var player = null;
var arrayProjectiles = [];
var arrayWalls = [];
var wave = 0;
var waveMax = 20;
var spawnTick = 0;
var spawnSec = 10;
var arrayEnemies = [];

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

	// Dynamic resize
	window.addEventListener("resize", resizeCanvas);

	// Hide system cursor
	document.getElementById('canvas').style.cursor = 'none';

	// Canvas Instances
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	resizeCanvas();
	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	};

	// Model instances
	map = new Map(1);
	for(var i=0;i<map.nbTilesY;i++) {
		for(var j=0;j<map.nbTilesX;j++) {
			if(map.arrayTiles[i][j] == 1){
				arrayWalls.push(new Wall(j*map.tileScale,
										 i*map.tileScale,
										 map.tileScale));
			}
		}
	}

	player = new Player(4,100,10,60);
	var spawnPos = map.getRandomSpawn(player.getSize())
	player.setX(spawnPos[0]);
	player.setY(spawnPos[1]);


	//// View instances
	view = new View(50);

	// Loop
	tick();
};

// Events ----------------------------------------------------------------------
document.onmousemove = function(e) {
	cursorX = e.pageX;
	cursorY = e.pageY;
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
	// Mouvement WASD
	if (e.which == 65) leftPush = true;
	else if (e.which == 68) rightPush = true;

	if (e.which == 87) upPush = true;
	else if (e.which == 83) downPush = true;

	// Abilities
	// Q = 81 E = 69
	if (e.which == 81) {
		player.ability--;
		if(player.ability === 0){
			player.ability = 4;
		}
	}
	if (e.which == 69) {
		player.ability++;
		if(player.ability == 5){
			player.ability = 1;
		}
	}
	// 1 2 3 4
	if (e.which == 49) player.ability = 1;
	if (e.which == 50) player.ability = 2;
	if (e.which == 51) player.ability = 3;
	if (e.which == 52) player.ability = 4;
};

// MAIN ------------------------------------------------------------------------
function tick() {
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

	// View
	ingameCursorX = cursorX + view.getDrawX();
	ingameCursorY = cursorY + view.getDrawY();
	view.changeDrawPosition(player.getX(),
							player.getY(),
							cursorX, cursorY, ctx);


	// Map
	view.drawMap(map.getNbTilesX(),map.getNbTilesY(),
				 map.getArrayTiles(), map.tileScale);

	// Player
	if(player.tick()) {
	view.drawPlayer(player.getX(),player.getY(),player.getSize());
	}
	else {
		view.drawGameOver();
		return false;
	}

	// Enemies
	//// Spawn
	if(arrayEnemies.length == 0){
		spawnTick++;
		if(spawnTick >= 60){
			spawnTick = 0;
			spawnSec--;
		}

		if(spawnSec <= 0){
			wave++;
			for(var i=0; i<waveMax;i++){
				var newEnemy = new Charger(1,100,1,60,400,200);
				var spawnPos = map.getRandomSpawn(newEnemy.getSize())
				newEnemy.setX(spawnPos[0]);
				newEnemy.setY(spawnPos[1]);
				arrayEnemies.push(newEnemy)
			}
			spawnSec = 10;
		}

	}

	//// Tick
	for(var i=0;i<arrayEnemies.length;i++){
		if(arrayEnemies[i].tick()){
			view.drawEnemy(arrayEnemies[i].getX(),
						   arrayEnemies[i].getY(),
						   arrayEnemies[i].getSize());
		}
		else{
			player.addExp(10);
			arrayEnemies.splice(i,1);
			i--;
		}
	}

	// Projectiles
	for(var i=0;i<arrayProjectiles.length;i++){
		if(arrayProjectiles[i].tick()){
			view.drawProjectile(arrayProjectiles[i].getX(),
				arrayProjectiles[i].getY(),
				arrayProjectiles[i].size);
		}
		else{
			arrayProjectiles.splice(i,1);
			i--;
		}
	}

	//UI -----
	view.drawHealthPlayer(player.health, player.maxHealth);
	view.drawExpPlayer(player.getExp(),player.getNextLevelExp());
	view.drawAbilitiesPlayer(player.ability);
	view.drawLvlPlayer(player.getLevel());
	view.drawWaveNum(wave);
	if(arrayEnemies.length == 0){view.drawSpawnSec(spawnSec);}
	else{view.drawEnemyNum(arrayEnemies.length, waveMax);}


	view.drawCursor(cursorX,cursorY);

	window.requestAnimationFrame(tick);
}
// Global functions ------------------------------------------------------------

// Resize Canvas on window event
function resizeCanvas() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}
