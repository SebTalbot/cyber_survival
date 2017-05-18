class LivingEntity extends DynamicEntity {
	constructor (speed,maxHealth,damage,attackRate) {
		super(0,0,speed);
		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.damage = damage;
		this.attackRate = attackRate;
		this.attackReady = true;
	}

	canAttack(){
		var ret = false;

		if(this.tickTime >= this.attackRate){
			this.tickTime = 0;
			ret = true;
		}

		return ret;
	}

	checkHealth() {
		if(this.health <= 0){
			this.alive = false;
		}
	}

	takeDamage(damage){
		this.health -= damage;
	}

	gainHealth(amount) {
		this.health += amount;
		if(this.health > this.maxHealth){
			this.health = this.maxHealth;
		}
	}
}
