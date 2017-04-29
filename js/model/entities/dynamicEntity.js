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

		for(var i=0;i<arrayWalls.length;i++) {
			if(this.isInRange(arrayWalls[i].getX(),
							  arrayWalls[i].getY(),
							  arrayWalls[i].getSize(),
							  testX,this.posY)){
				wallX = true;
			}
		}

		return wallX;
	}

	hasCollideY(testY){
		var wallY = false;

		for(var i=0;i<arrayWalls.length;i++) {
			if(this.isInRange(arrayWalls[i].getX(),
							  arrayWalls[i].getY(),
							  arrayWalls[i].getSize(),
							  this.posX,testY)){
				wallY = true;
			}
		}

		return wallY;
	}
}
