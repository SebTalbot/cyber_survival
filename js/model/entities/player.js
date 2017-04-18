class Player extends LivingEntity{
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed,maxHealth,damage,attackRate);
	}

	move() {
		if(leftPush) {
			this.moveLeft();
		}
		if(rightPush) {
			this.moveRight();
		}
		if(upPush) {
			this.moveUp();
		}
		if(downPush) {
			this.moveDown();
		}
	}

	tick(){
		this.checkHealth();
		this.move();
		console.log(this.getX())

		return this.alive;
	}
}
