class DynamicEntity extends Entity {
	constructor (x,y,speed) {
		super(x,y);
		this.speed = speed;
	}

	isInRange(objX, objY, objSize, newX, newY) {
		// Doesn't take the center position of the object
		var result = false;
		var instanceX = newX - (this.size/2);
		var instanceY = newY - (this.size/2);

		if(objX < instanceX + this.size &&
		   objX + objSize > instanceX &&
		   objY < instanceY + this.size &&
		   objY + objSize > instanceY) {
			result = true;
		}

		return result;
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
