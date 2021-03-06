class Boss extends Enemy{
	constructor(speed,maxHealth,damage,attackRate,visionRange,attackRange){
		super(speed,maxHealth,damage,attackRate,visionRange,attackRange);
		this.id = 3;
		this.atick = 100;
	}

	tick(){
		this.tickTime++;
		this.checkHealth();

		if(this.detectPlayer() || this.gotShot){
			this.atick++;
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
					// East
					var projectile = new Projectile(this.posX, this.posY,15,
								this.damage,this.posX+1,this.posY,false,false,5)
					projectile.size*=3;
					arrayProjectiles.push(projectile);
					// West
					projectile = new Projectile(this.posX, this.posY,15,
								this.damage,this.posX-1,this.posY,false,false,5)
					projectile.size*=3;
					arrayProjectiles.push(projectile);
					// North
					projectile = new Projectile(this.posX, this.posY,15,
								this.damage,this.posX,this.posY-1,false,false,5)
					projectile.size*=3;
					arrayProjectiles.push(projectile);
					// south
					projectile = new Projectile(this.posX, this.posY,15,
								this.damage,this.posX,this.posY+1,false,false,5)
					projectile.size*=3;
					arrayProjectiles.push(projectile);
					// Player
					projectile = new Projectile(this.posX, this.posY,10,
								this.damage,player.posX,player.posY,false,false,2)
					arrayProjectiles.push(projectile);
				}
			}
			if(this.detectPlayer()){
				this.gotShot = false;
			}
		}
		else{
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
