class LivingEntity extends DynamicEntity {
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed);
		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.damage = damage;
		this.attackRate = attackRate;
		this.attackReady = true;
	}

	canAttack(){
		if(this.tickTime >= this.attackRate){
			this.tickTime = 0;
			this.attackReady = true;
		}
		else{
			this.attackReady = false;
		}
		return this.attackReady;
	}

	checkHealth() {
		if(this.health <= 0){
			this.alive = false;
		}
	}

	reduceHealth(amount) {
		this.health -= amount;
	}

	gainHealth(amount) {
		this.health += amount;
	}
}
