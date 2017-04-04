class PlayerView {
	constructor () {
	}

	draw (posX, posY) {
		ctx.fillStyle = "#33CCFF";
		ctx.fillRect(posX - camera.getX() - scale/2,
					 posY - camera.getY() - scale/2,
					 scale,
					 scale);
	}
}
