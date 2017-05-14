class Player extends LivingEntity{
	constructor (speed,maxHealth,damage,attackRate) {
		super(speed,maxHealth,damage,attackRate);
		this.level = 1;
		this.exp = 0;
		this.nextLevelExp = 100;
		this.size = 40;
		this.ability = 1;
		this.cooldown1 = 0;
		this.cooldown2 = 0;
	}

	tick(){
		this.cooldown1-=this.attackRate;
		console.log(this.cooldown1)
		this.cooldown2-=this.attackRate;
		this.checkHealth();
		this.move();
		if(mouseClick){
			if(this.ability == 1){
				if(this.cooldown1 <= 0){
					this.cooldown1 = 30;
					arrayProjectiles.push(this.basicAttack());
				}
			}
			else if(this.ability == 2){
				if(this.cooldown2 <= 0){
					this.cooldown2 = 120;
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
										 ingameCursorY, true, 2);
		return basicAttack;
	}

	attackTwo() {
		var attackTwo = new Projectile(this.posX, this.posY, 5, 100, ingameCursorX,
										 ingameCursorY, true, 4);
		attackTwo.size*=3;
		return attackTwo;
	}

	checkLevelUp(){
		if(this.exp >= this.nextLevelExp){
			this.level++;
			this.exp = 0;
			this.speed+=0.2;
			this.damage+=5;
			this.attackRate+=0.5;
			this.maxHealth+=10;
			this.gainHealth(10);
			this.nextLevelExp*=1.2;
		}
	}

	// Set Get
	getExp(){
		return this.exp;
	}

	getNextLevelExp(){
		return this.nextLevelExp;
	}

	addExp(value){
		this.exp+= value;
		this.checkLevelUp();
	}

	getLevel(){
		return this.level;
	}
}
