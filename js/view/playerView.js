class PlayerView {
	constructor (scale) {
		this.posX = player.getX();
		this.posY = player.getY();
		this.scale = scale;
	}

	draw () {
		this.posX = player.getX();
		this.posY = player.getY();
		ctx.fillStyle = "#33CCFF";
		ctx.fillRect(this.posX - (this.scale/2),
					 this.posY - (this.scale/2),
					 this.scale,
					 this.scale);
	}
}
