class Player {
	constructor () {
		this.posX = 0;
		this.posY = 0;
		this.speed = 5;
	}

	move() {
		if(leftPush) {
			this.posX -= this.speed;
		}
		if(rightPush) {
			this.posX += this.speed;
		}
		if(upPush) {
			this.posY -= this.speed;
		}
		if(downPush) {
			this.posY += this.speed;
		}
	}

	tick(){
		this.move();
	}

	// Get
	getX () { return this.posX };
	getY () { return this.posY };
}
