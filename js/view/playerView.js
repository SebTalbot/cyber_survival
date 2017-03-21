class PlayerView {
	constructor (scale) {
		this.scale = scale;
	}

	draw (posX, posY) {
		ctx.fillStyle = "#33CCFF";
		ctx.fillRect(posX - (this.scale/2),
					 posY - (this.scale/2),
					 this.scale,
					 this.scale);
	}
}
