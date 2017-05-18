// Canvas vars
var canvas = null;
var canvasDimension = null;
var ctx = null;

// Model vars
var map = null;
var player = null;
var arrayProjectiles = [];
var arrayHP = [];
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
	player = new Player(5,100,10,1);
	var spawnPos = map.getRandomSpawn(player.size)
	player.posX = spawnPos[0];
	player.posY = spawnPos[1];


	//// View instances
	view = new View(50);

	// Loop
	tick();
};

// Events ----------------------------------------------------------------------

document.onmousemove = function(e) {
	// Get Mouse position
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
	// Stop moving on button release
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

	// Spacebar to start the wave
	if (e.which == 32) spawnSec = 0;
};

//// Mouse wheel event
// IE9, Chrome, Safari, Opera
document.addEventListener("mousewheel", MouseWheelHandler, false);
// Firefox
document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
function MouseWheelHandler(e) {
	// Scroll to change ability
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
	ingameCursorX = cursorX + view.dpX;
	ingameCursorY = cursorY + view.dpY;
	view.changeDrawPosition(player.posX,
							player.posY,
							cursorX, cursorY, ctx);


	// Map
	view.drawMap(map.nbTilesX,map.nbTilesY,
				 map.arrayTiles, map.tileScale);

	// HealthPack
	for(var i=0;i<arrayHP.length;i++){
		if(arrayHP[i].tick()){
			view.drawHealthPack(arrayHP[i].posX, arrayHP[i].posY, arrayHP[i].size);
		}
		else{
			arrayHP.splice(i,1);
			i--;
		}
	}

	// Player
	if(player.tick()) {
	view.drawPlayer(player.posX,player.posY,player.size);
	}
	else {
		view.drawGameOver();
		return false;
	}

	//// Enemies Spawn
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
				var spawnPos = map.getRandomSpawn(newEnemy.size)
				newEnemy.posX = spawnPos[0];
				newEnemy.posY = spawnPos[1];
				newEnemy.choseDestination();
				arrayEnemies.push(newEnemy)
			}
		}

	}

	//// Enemies tick
	for(var i=0;i<arrayEnemies.length;i++){
		if(arrayEnemies[i].tick()){
			view.drawEnemy(arrayEnemies[i].posX,
						   arrayEnemies[i].posY,
						   arrayEnemies[i].size,
						   arrayEnemies[i].id,
						   arrayEnemies[i].health,
						   arrayEnemies[i].maxHealth);
		}
		else{
			// 33% chances to generate Healthpack
			var rand = Math.floor((Math.random()*10) + 1);
			if(rand <= 3){
				arrayHP.push(new HealthPack(arrayEnemies[i].posX, arrayEnemies[i].posY));
			}
			// give exp
			player.addExp(20+(5*wave));
			// rip enemy
			arrayEnemies.splice(i,1);
			spawnSec = 10;
			i--;
		}
	}

	// Projectiles
	for(var i=0;i<arrayProjectiles.length;i++){
		if(arrayProjectiles[i].tick()){
			view.drawProjectile(arrayProjectiles[i].posX,
				arrayProjectiles[i].posY,
				arrayProjectiles[i].size,
				arrayProjectiles[i].friendly);
		}
		else{
			arrayProjectiles.splice(i,1);
			i--;
		}
	}

	//UI -----
	view.drawHealthPlayer(player.health, player.maxHealth);
	view.drawExpPlayer(player.exp,player.nextLevelExp);
	view.drawAbilitiesPlayer(player.ability);
	view.drawAbilitiesCoolDown(player.cooldown1, player.cd1Max,
							   player.cooldown2, player.cd2Max,
							   player.cooldown3, player.cd3Max,
							   player.cooldown4, player.cd4Max);
	view.drawLvlPlayer(player.level);
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
