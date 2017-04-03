class MapView {
	constructor () {
	}

	draw (nbTilesX, nbTilesY, arrayTiles) {
		for (var i = 0; i < nbTilesY; i++) {
			for (var j = 0; j < nbTilesX; j++) {
				if (arrayTiles[i][j] == 0){
					ctx.fillStyle = "#338833";
					ctx.fillRect(j*scale,
								 i*scale,
								 scale,
								 scale);
				}
				else if (arrayTiles[i][j] == 1){
					ctx.fillStyle = "#000000";
					ctx.fillRect(j*scale,
								 i*scale,
								 scale,
								 scale);
				}
			}
		}
	}
}
