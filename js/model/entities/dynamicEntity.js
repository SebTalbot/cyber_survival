class DynamicEntity extends Entity {
	constructor (x,y,speed) {
		super(x,y);
		this.speed = speed;
	}

	moveRight(){
		this.posX += this.speed;
	}

	moveLeft(){
		this.posX -= this.speed;
	}

	moveDown(){
		this.posY += this.speed;
	}

	moveUp(){
		this.posY -= this.speed;
	}
}
