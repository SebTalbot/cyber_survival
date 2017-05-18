class Charger extends Enemy{
	constructor(speed,maxHealth,damage,attackRate,visionRange,attackRange){
		super(speed,maxHealth,damage,attackRate,visionRange,attackRange);
		this.id = 1;
		this.excitedSpeed = this.speed*2+1;
		this.calmSpeed = this.speed;
		this.atick = 100;
	}

	tick(){
		this.tickTime++;
		this.checkHealth();

		if(this.detectPlayer() || this.gotShot){
			this.atick++;
			this.speed = this.excitedSpeed;
			this.destinationX = player.posX;
			this.destinationY = player.posY;
			// Follow the player
			if(this.atick >= 15){
				this.path = this.astar();
				this.atick = 0;
			}
			if(typeof this.path[0] != 'undefined'){
				this.posX = this.path[0].x
				this.posY = this.path[0].y
				this.path.splice(0,1);
			}
			// Attack the player
			if(this.isInAttackRange()){
				if(this.canAttack()){
					this.health = 0;
					player.takeDamage(10);
				}
			}
			if(this.detectPlayer()){
				this.gotShot = false;
			}
		}
		else{
			this.speed = this.calmSpeed;
			this.atick = 60;
			if(this.path.length != 0){
				this.posX = this.path[0].x
				this.posY = this.path[0].y
				this.path.splice(0,1);
			}
			else{
				if(Math.abs(this.posX - this.destinationX) <= this.speed &&
				   Math.abs(this.posY - this.destinationY) <= this.speed ){
					this.choseDestination();
				}
				this.path = this.astar();
			}
		}


		return this.alive;
	}
}
