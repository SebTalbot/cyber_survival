class Entity {
	constructor (x,y) {
		this.posX = x;
		this.posY = y;
		this.alive = true;
		this.tickTime = 0;
	}

	// getter
	getX(){ return this.posX; }
	getY(){ return this.posY; }
}
