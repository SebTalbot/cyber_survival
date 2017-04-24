class Entity {
	constructor (x,y) {
		this.size = 5;
		this.posX = x;
		this.posY = y;
		this.alive = true;
		this.tickTime = 0;
	}

	// getter
	getX(){ return this.posX; }
	getY(){ return this.posY; }
	getSize(){ return this.size; }

	// Setter
	setSize(value){ this.size = value; }
}
