class Player extends LivingEntity{
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed,maxHealth,damage,attackRate);
		this.size = 40;
		this.ability = 1;
	}

	tick(){
		this.tickTime++;
		this.checkHealth();
		this.move();
		if(mouseClick){
			if(this.canAttack()){
				if(this.ability == 1){
					arrayProjectiles.push(this.basicAttack());
				}
				else if(this.ability == 2){
					arrayProjectiles.push(this.attackTwo());
				}
			}
		}

		return this.alive;
	}

	move() {
		var newX = this.posX;
		var newY = this.posY;

		if(leftPush) {
			newX-=this.speed;
		}
		if(rightPush) {
			newX+=this.speed;
		}
		if(upPush) {
			newY-=this.speed;
		}
		if(downPush) {
			newY+=this.speed;
		}

		if(!this.hasCollideX(newX)){
			this.posX = newX;
		}
		if(!this.hasCollideY(newY)){
			this.posY = newY;
		}
	}

	basicAttack() {
		var basicAttack = new Projectile(this.posX, this.posY, 25, 25, ingameCursorX,
										 ingameCursorY, 2);
		return basicAttack;
	}

	attackTwo() {
		var attackTwo = new Projectile(this.posX, this.posY, 10, 100, ingameCursorX,
										 ingameCursorY, 4);
		return attackTwo;
	}
}
