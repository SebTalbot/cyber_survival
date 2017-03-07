class CursorView {
	constructor (scale) {
		this.posX = 0;
		this.posY = 0;
		this.scale = scale;
		this.color = "#FFFFFF";
	}

	drawCursor () {
		ctx.fillStyle = this.color;
		// North
		ctx.fillRect(this.posX - 1,
					 this.posY - (this.scale/2),
					 3,
					 this.scale/4)
		// South
		ctx.fillRect(this.posX - 1,
					 this.posY + (this.scale/4),
					 3,
					 this.scale/4)
		// East
		ctx.fillRect(this.posX - (this.scale/2),
					 this.posY - 1,
					 this.scale/4,
					 3)
		// West
		ctx.fillRect(this.posX + (this.scale/4),
					 this.posY - 1,
					 this.scale/4,
					 3)
		// Center
		ctx.fillRect(this.posX - 1,
					 this.posY - 1,
					 3,
					 3)

	}

	move (x, y) {
		this.posX = x;
		this.posY = y;
		this.drawCursor();
	}

}
