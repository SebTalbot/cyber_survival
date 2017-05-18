class DynamicEntity extends Entity {
	constructor (x,y,speed) {
		super(x,y);
		this.speed = speed;
	}

	hasCollideX(testX){
		var wallX = false;
		var posMap = map.getPositionInArray(testX,this.posY);

		if(map.arrayTiles[posMap[1]][posMap[0]] == 1){
			wallX = true;
		}

		return wallX;
	}

	hasCollideY(testY){
		var wallY = false;
		var posMap = map.getPositionInArray(this.posX,testY);

		if(map.arrayTiles[posMap[1]][posMap[0]] == 1){
			wallY = true;
		}

		return wallY;
	}

	hasCollideBoth(testX,testY){
		var wall = false;
		var posMap = map.getPositionInArray(testX,testY);

		if(map.arrayTiles[posMap[1]][posMap[0]] == 1){
			wall = true;
		}

		return wall;
	}
}
