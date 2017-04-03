class PlayerView {
	constructor () {
	}

	draw (posX, posY) {
		ctx.fillStyle = "#33CCFF";
		ctx.fillRect(posX - (scale/2),
					 posY - (scale/2),
					 scale,
					 scale);
	}
}
