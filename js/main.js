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
var waveMax = 10;
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

	player = new Player(5,100,10,1);
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

	// Spacebar
	if (e.which == 32) spawnSec = 0;
};

//// Mouse wheel event
// IE9, Chrome, Safari, Opera
document.addEventListener("mousewheel", MouseWheelHandler, false);
// Firefox
document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
function MouseWheelHandler(e) {
	if (e.wheelDeltaY > 0) {
		player.ability--;
		if(player.ability === 0){
			player.ability = 4;
		}
	}
	else {
		player.ability++;
		if(player.ability == 5){
			player.ability = 1;
		}
	}

    return false;
}


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
			if(wave%5 == 0){ waveMax+=5;}
			for(var i=0; i<waveMax;i++){
				if(wave%5 == 0 && i == 0){
					var newEnemy = new Boss(4+(0.5*wave),100*wave,2*wave,30,500,500);
				}
				else if( i < waveMax/2){
					var newEnemy = new Charger(2+(0.1*wave),100+(10*wave),
											1+(0.1*wave),1,300+(2.5*wave),40);
				}
				else{
					var newEnemy = new Shooter(3.5+(0.15*wave),200+(25*wave),
											4+(0.5*wave),35,400+(5*wave),300+(5*wave));
				}
				var spawnPos = map.getRandomSpawn(newEnemy.getSize())
				newEnemy.setX(spawnPos[0]);
				newEnemy.setY(spawnPos[1]);
				newEnemy.choseDestination();
				arrayEnemies.push(newEnemy)
			}
		}

	}

	//// Tick
	for(var i=0;i<arrayEnemies.length;i++){
		if(arrayEnemies[i].tick()){
			view.drawEnemy(arrayEnemies[i].getX(),
						   arrayEnemies[i].getY(),
						   arrayEnemies[i].getSize(),
						   arrayEnemies[i].getId(),
						   arrayEnemies[i].getHp(),
						   arrayEnemies[i].getMaxHP());
		}
		else{
			player.addExp(20+(5*wave));
			arrayEnemies.splice(i,1);
			spawnSec = 10;
			i--;
		}
	}

	// Projectiles
	for(var i=0;i<arrayProjectiles.length;i++){
		if(arrayProjectiles[i].tick()){
			view.drawProjectile(arrayProjectiles[i].getX(),
				arrayProjectiles[i].getY(),
				arrayProjectiles[i].size,
				arrayProjectiles[i].isFriendly());
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
	view.drawAbilitiesCoolDown(player.getCD1(), player.getCD1Max(),
							   player.getCD2(), player.getCD2Max(),
							   player.getCD3(), player.getCD3Max(),
							   player.getCD4(), player.getCD4Max());
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
