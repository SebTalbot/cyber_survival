class Camera {
	constructor() {
		this.posX = 0;
		this.posY = 0;
		this.playerX = 0;
		this.platerY = 0;
	}

	changePosition (playerX, playerY, cursorX, cursorY, ctx) {
		var diffCurX = cursorX - ctx.canvas.width/2;
		var diffCurY = cursorY - ctx.canvas.height/2;

		this.posX = playerX - ctx.canvas.width/2 + (diffCurX/2);
		this.posY = playerY - ctx.canvas.height/2 + (diffCurY/2);

	}

	getX () {return this.posX;}
	getY () {return this.posY;}
}
