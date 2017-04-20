class Player extends LivingEntity{
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed,maxHealth,damage,attackRate);
	}

	tick(){
		this.tickTime++;
		this.checkHealth();
		this.move();
		if(mouseClick){
			if(this.canAttack()){
				arrayProjectiles.push(this.basicAttack());
			}
		}

		return this.alive;
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

	basicAttack() {
		var basicAttack = new Projectile(this.posX, this.posY, 8, ingameCursorX,
										 ingameCursorY, 3);
		return basicAttack;
	}
}
