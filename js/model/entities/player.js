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
		this.cooldown3 = 0;
		this.cooldown4 = 0;
		this.cd1Max = 10;
		this.cd2Max = 240;
		this.cd3Max = 180;
		this.cd4Max = 600;
	}

	tick(){
		// Abilities cooldown reduction
		if(this.cooldown1 > 0){this.cooldown1--;}
		if(this.cooldown2 > 0){this.cooldown2-=this.attackRate;}
		else{this.cooldown2 = 0;}
		if(this.cooldown3 > 0){this.cooldown3-=this.attackRate;}
		else{this.cooldown3 = 0;}
		if(this.cooldown4 > 0){this.cooldown4-=this.attackRate;}
		else{this.cooldown4 = 0;}

		this.checkHealth();
		this.move();
		if(mouseClick){
			if(this.ability == 1){
				if(this.cooldown1 <= 0){
					this.cooldown1 = this.cd1Max;
					arrayProjectiles.push(this.basicAttack());
				}
			}
			else if(this.ability == 2){
				if(this.cooldown2 <= 0){
					this.cooldown2 = this.cd2Max;
					arrayProjectiles.push(this.attackTwo());
				}
			}
			else if(this.ability == 3){
				if(this.cooldown3 <= 0){
					this.cooldown3 = this.cd3Max;
					var arrayAttack = this.attackThree();
					for(var i=0; i<arrayAttack.length;i++){
						arrayAttack[i].size*=4;
						arrayProjectiles.push(arrayAttack[i]);
					}
				}
			}
			else if(this.ability == 4){
				if(this.cooldown4 <= 0){
					this.cooldown4 = this.cd4Max;
						arrayProjectiles.push(this.attackFour());
				}
			}
		}

		// return this.alive;
		return true;
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
		var basicAttack = new Projectile(this.posX, this.posY, 35, this.damage, ingameCursorX,
										 ingameCursorY, true, false, 2);
		return basicAttack;
	}

	attackTwo() {
		var attackTwo = new Projectile(this.posX, this.posY, 5, this.damage*2, ingameCursorX,
										 ingameCursorY, true, true, 4);
		attackTwo.size*=3;
		return attackTwo;
	}

	attackThree() {
		var arrayAttack = [];
		arrayAttack.push(new Projectile(this.posX, this.posY, 15, 3*this.damage, this.posX+1,this.posY, true, false, 4));
		arrayAttack.push(new Projectile(this.posX, this.posY, 15, 3*this.damage, this.posX-1,this.posY, true, false, 4));
		arrayAttack.push(new Projectile(this.posX, this.posY, 15, 3*this.damage, this.posX+1,this.posY+1, true, false, 4));
		arrayAttack.push(new Projectile(this.posX, this.posY, 15, 3*this.damage, this.posX-1,this.posY-1, true, false, 4));
		arrayAttack.push(new Projectile(this.posX, this.posY, 15, 3*this.damage, this.posX-1,this.posY+1, true, false, 4));
		arrayAttack.push(new Projectile(this.posX, this.posY, 15, 3*this.damage, this.posX+1,this.posY-1, true, false, 4));
		arrayAttack.push(new Projectile(this.posX, this.posY, 15, 3*this.damage, this.posX,this.posY+1, true, false, 4));
		arrayAttack.push(new Projectile(this.posX, this.posY, 15, 3*this.damage, this.posX,this.posY-1, true, false, 4));

		return arrayAttack;
	}

	attackFour() {
		var attackFour = new Projectile(this.posX, this.posY, 10, this.damage*30, ingameCursorX,
										 ingameCursorY, true, true, 4);
		attackFour.size*=7;
		return attackFour;
	}

	checkLevelUp(){
		if(this.exp >= this.nextLevelExp){
			this.level++;
			this.exp = 0;
			this.speed+=0.2;
			this.damage+=1.5;
			this.attackRate+=0.5;
			this.maxHealth+=10;
			this.gainHealth(10);
			this.nextLevelExp*=1.2;
		}
	}

	addExp(value){
		this.exp+= value;
		this.checkLevelUp();
	}
}
