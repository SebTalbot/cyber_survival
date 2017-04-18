class LivingEntity extends DynamicEntity {
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed);
		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.damage = damage;
		this.attackRate = attackRate;
	}

	checkHealth () {
		if(this.health <= 0){
			this.alive = false;
		}
	}

	reduceHealth (amount) {
		this.health -= amount;
	}

	gainHealth (amount) {
		this.health += amount;
	}
}
