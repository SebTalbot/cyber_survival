class Player extends LivingEntity{
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed,maxHealth,damage,attackRate);
		this.size = 50;
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

		// Wall collison X
		var wallX = false;
		for(var i=0;i<arrayWalls.length;i++) {
			if(this.isInRange(arrayWalls[i].getX(),
							  arrayWalls[i].getY(),
							  arrayWalls[i].getSize(),
							  newX,this.posY)){
				wallX = true;
			}
		}

		// Wall collison Y
		var wallY = false;
		for(var i=0;i<arrayWalls.length;i++) {
			if(this.isInRange(arrayWalls[i].getX(),
							  arrayWalls[i].getY(),
							  arrayWalls[i].getSize(),
							  this.posX,newY)){
				wallY = true;
			}
		}

		if(!wallX){
			this.posX = newX;
		}
		if(!wallY){
			this.posY = newY;
		}
	}

	basicAttack() {
		var basicAttack = new Projectile(this.posX, this.posY, 25, ingameCursorX,
										 ingameCursorY, 2);
		return basicAttack;
	}
}
