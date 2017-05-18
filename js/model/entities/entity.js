class Entity {
	constructor (x,y) {
		this.size = 5;
		this.posX = x;
		this.posY = y;
		this.alive = true;
		this.tickTime = 0;
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


	// getter
	getX(){ return this.posX; }
	getY(){ return this.posY; }
	getSize(){ return this.size; }

	// Setter
	setX(value){ this.posX = value;}
	setY(value){ this.posY = value;}
	setSize(value){ this.size = value; }
}
