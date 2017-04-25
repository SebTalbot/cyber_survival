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
					ctx.fillStyle = "#338833";
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

	// Enemy -------------------------------------------------------------------
	drawEnemy(posX, posY, playerScale) {
		ctx.fillStyle = "#660000";
		ctx.fillRect(posX - this.dpX -(playerScale/2),
					 posY - this.dpY -(playerScale/2),
					 playerScale,
					 playerScale);
	}

	// Projectile --------------------------------------------------------------
	drawProjectile(posX, posY){
		ctx.fillStyle = "#ff0000";
		ctx.fillRect(posX - this.dpX - (this.scale/8),
					 posY - this.dpY - (this.scale/8),
					 this.scale/4,
					 this.scale/4);
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

	getDrawX(){return this.dpX;}
	getDrawY(){return this.dpY;}

}
