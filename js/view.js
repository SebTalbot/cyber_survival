class View {

	constructor (scale) {
		this.scale = scale;
		this.dpX = 0;
		this.dpY = 0;
	}

	// Change draw position A.K.A camera ------------------------------------------
	changeDrawPosition (playerX, playerY, cursorX, cursorY) {
		var diffCurX = cursorX - ctx.canvas.width/2;
		var diffCurY = cursorY - ctx.canvas.height/2;

		this.dpX = playerX - ctx.canvas.width/2 + (diffCurX/2);
		this.dpY = playerY - ctx.canvas.height/2 + (diffCurY/2);
		this.dpX = Math.round(this.dpX);
		this.dpY = Math.round(this.dpY);
	}

	// Map ---------------------------------------------------------------------
	drawMap(nbTilesX, nbTilesY, arrayTiles, tileScale) {
		for(var i = 0; i < nbTilesY; i++) {
			for(var j = 0; j < nbTilesX; j++) {
				if (arrayTiles[i][j] == 0) {
					ctx.fillStyle = "#333";
					ctx.fillRect(j*tileScale - this.dpX,
								 i*tileScale - this.dpY,
								 tileScale,
								 tileScale);
				}
				else if (arrayTiles[i][j] == 1) {
					ctx.fillStyle = "#000000";
					ctx.fillRect(j*tileScale - this.dpX,
								 i*tileScale - this.dpY,
								 tileScale,
								 tileScale);
				}
				else if (arrayTiles[i][j] == 2) {
					ctx.fillStyle = "#202099";
					ctx.fillRect(j*tileScale - this.dpX,
								 i*tileScale - this.dpY,
								 tileScale,
								 tileScale);
				}
			}
		}
	}

	// Player ------------------------------------------------------------------
	drawPlayer(posX, posY, playerScale) {
		ctx.fillStyle = "#33CCFF";
		ctx.fillRect(posX - this.dpX -(playerScale/2),
					 posY - this.dpY -(playerScale/2),
					 playerScale,
					 playerScale);
	}

	drawHealthPlayer(health, maxHealth) {
		ctx.fillStyle = "#FFF";
		ctx.fillRect(10, 10,
					this.getPercentX(35),
					this.getPercentY(5));

		ctx.fillStyle = "#600";
		ctx.fillRect(12, 12,
					this.getPercentX(35)-4,
					this.getPercentY(5)-4);

		var healthPercent = health/maxHealth*100;
		var healthWidth = healthPercent*(this.getPercentX(35)-4)/100;

		ctx.fillStyle = "#060";
		ctx.fillRect(12, 12,
					healthWidth,
					this.getPercentY(5)-4);

		ctx.fillStyle = "#FFF";
		ctx.textAlign="left";
		ctx.textBaseline="top";
		ctx.font = this.getPercentY(3)+"px Arial";
		ctx.fillText(health+"/"+maxHealth, 20, 13);

	}

	drawLvlPlayer(level){
		ctx.fillStyle = "#FFF";
		ctx.textAlign="left";
		ctx.textBaseline="top";
		ctx.font = this.getPercentY(3)+"px Arial";
		ctx.fillText("Niveau "+level,10,this.getPercentY(7));
	}

	drawExpPlayer(exp, nextLevel){
		ctx.fillStyle = "#FFF";
		ctx.fillRect(this.getPercentX(0.5),
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2),
					this.getPercentX(99),
					this.getPercentY(2));

		ctx.fillStyle = "#333";
		ctx.fillRect(this.getPercentX(0.5)+2,
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)+2,
					this.getPercentX(99)-4,
					this.getPercentY(2)-4);

		var expPercent = exp/nextLevel*100;
		var expWidth = expPercent*(this.getPercentX(99)-4)/100;

		ctx.fillStyle = "#cc0";
		ctx.fillRect(this.getPercentX(0.5)+2,
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)+2,
					expWidth,
					this.getPercentY(2)-4);

	}

	drawAbilitiesPlayer(ability){
		var color1 = "#FFF";
		var color2 = "#FFF";
		var color3 = "#FFF";
		var color4 = "#FFF";

		if(ability == 1){color1 = "#eeaa00";}
		if(ability == 2){color2 = "#eeaa00";}
		if(ability == 3){color3 = "#eeaa00";}
		if(ability == 4){color4 = "#eeaa00";}

		ctx.fillStyle = color1;
		ctx.fillRect(window.innerWidth/2-this.getPercentX(4)*2-this.getPercentX(1.5),
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)-
					this.getPercentX(0.5)-this.getPercentX(4),
					this.getPercentX(4),
					this.getPercentX(4));

		ctx.fillStyle = color2;
		ctx.fillRect(window.innerWidth/2-this.getPercentX(4)-this.getPercentX(0.5),
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)-
					this.getPercentX(0.5)-this.getPercentX(4),
					this.getPercentX(4),
					this.getPercentX(4));

		ctx.fillStyle = color3;
		ctx.fillRect(window.innerWidth/2+this.getPercentX(0.5),
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)-
					this.getPercentX(0.5)-this.getPercentX(4),
					this.getPercentX(4),
					this.getPercentX(4));

		ctx.fillStyle = color4;
		ctx.fillRect(window.innerWidth/2+this.getPercentX(4)+this.getPercentX(1.5),
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)-
					this.getPercentX(0.5)-this.getPercentX(4),
					this.getPercentX(4),
					this.getPercentX(4));
	}

	drawAbilitiesCoolDown(cd1,cd1Max,cd2,cd2Max){
		var color = "rgba(0,0,0,0.8)";


		ctx.fillStyle = color;
		var percent = cd1/cd1Max;
		ctx.fillRect(window.innerWidth/2-this.getPercentX(4)*2-this.getPercentX(1.5),
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)-
					this.getPercentX(0.5),
					this.getPercentX(4),
					-percent*this.getPercentX(4));

		percent = cd2/cd2Max;
		ctx.fillRect(window.innerWidth/2-this.getPercentX(4)-this.getPercentX(0.5),
					window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)-
					this.getPercentX(0.5),
					this.getPercentX(4),
					-percent*this.getPercentX(4));
        //
		// ctx.fillRect(window.innerWidth/2+this.getPercentX(0.5),
		// 			window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)-
		// 			this.getPercentX(0.5)-this.getPercentX(4),
		// 			this.getPercentX(4),
		// 			this.getPercentX(4));
        //
		// ctx.fillRect(window.innerWidth/2+this.getPercentX(4)+this.getPercentX(1.5),
		// 			window.innerHeight-this.getPercentX(0.5)-this.getPercentY(2)-
		// 			this.getPercentX(0.5)-this.getPercentX(4),
		// 			this.getPercentX(4),
		// 			this.getPercentX(4));
	}

	// Enemy -------------------------------------------------------------------
	drawEnemy(posX, posY, playerScale, id, health, maxHealth) {
		if(id == 1){
			ctx.fillStyle = "#0a0";
			ctx.fillRect(posX - this.dpX -(playerScale/2),
						 posY - this.dpY -(playerScale/2),
						 playerScale,
						 playerScale);
		}
		else if(id == 2){
			ctx.fillStyle = "#00a";
			ctx.fillRect(posX - this.dpX -(playerScale/2),
						 posY - this.dpY -(playerScale/2),
						 playerScale,
						 playerScale);
		}
		else if(id == 3){
			ctx.fillStyle = "#a05";
			ctx.fillRect(posX - this.dpX -(playerScale/2),
						 posY - this.dpY -(playerScale/2),
						 playerScale,
						 playerScale);
		}
		ctx.fillStyle = "#000";
		ctx.fillRect(posX - this.dpX -(playerScale/2)+2,
					 posY - this.dpY -(playerScale/2)+2,
					 playerScale-4,
					 playerScale-4);

		// Draw life
		if(health < maxHealth){
			var percent = health/maxHealth;
			ctx.fillStyle = "rgba(20,250,20,0.8)";
			ctx.fillRect(posX - this.dpX -(playerScale/2),
						posY - this.dpY -(playerScale/2) - (playerScale/4*2),
						percent*playerScale,
						playerScale/4);
		}
	}

	drawSpawnSec(sec){
		ctx.fillStyle = "#FFF";
		ctx.textAlign="center";
		ctx.textBaseline="top";
		ctx.font = this.getPercentY(2)+"px Arial";
		ctx.fillText(sec+" seconde(s) avant la prochaine vague",
			this.getPercentX(50), this.getPercentY(7));
	}

	drawWaveNum(number){
		ctx.fillStyle = "#FFF";
		ctx.textAlign="end";
		ctx.textBaseline="top";
		ctx.font = this.getPercentY(3)+"px Arial";
		ctx.fillText("Vague: "+number,
			this.getPercentX(100)-10, this.getPercentY(7));
	}

	drawEnemyNum(current,max){
		ctx.fillStyle = "#FFF";
		ctx.textAlign="end";
		ctx.textBaseline="top";
		ctx.font = this.getPercentY(3)+"px Arial";
		ctx.fillText(current+"/"+max+ " ennemi(s)",
			this.getPercentX(100)-10, this.getPercentY(11));
	}

	// Projectile --------------------------------------------------------------
	drawProjectile(posX, posY, Projectilescale){
		ctx.fillStyle = "#ff0000";
		ctx.fillRect(posX - this.dpX - (Projectilescale/2),
					 posY - this.dpY - (Projectilescale/2),
					 Projectilescale,
					 Projectilescale);
	}

	// Cursor ------------------------------------------------------------------
	drawCursor(posX, posY){
		ctx.fillStyle = "#FFFFFF";
		// North
		ctx.fillRect(posX - 1,
					 posY - (this.scale/2),
					 3,
					 this.scale/4);
		// South
		ctx.fillRect(posX - 1,
					 posY + (this.scale/4),
					 3,
					 this.scale/4);
		// East
		ctx.fillRect(posX - (this.scale/2),
					 posY - 1,
					 this.scale/4,
					 3);
		// West
		ctx.fillRect(posX + (this.scale/4),
					 posY - 1,
					 this.scale/4,
					 3);
		// Center
		ctx.fillRect(posX - 1,
					 posY - 1,
					 3,
					 3);
	}

	getPercentX(value){
		return (value*window.innerWidth)/100;
	}
	getPercentY(value){
		return (value*window.innerHeight)/100;
	}

	getDrawX(){return this.dpX;}
	getDrawY(){return this.dpY;}

	// Game Over ---------------------------------------------------------------
	drawGameOver(){
		ctx.fillStyle = "#FFF";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.font = this.getPercentY(15)+"px Arial";
		ctx.fillText("Vous etes mort",
			this.getPercentX(50), this.getPercentY(50));
	}

}
