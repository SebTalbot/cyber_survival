class Projectile extends DynamicEntity {
	constructor(x, y, speed, damage, directionX, directionY, friendly, lifespan){
		super(x, y, speed);
		this.size = 10;
		var deltaX = directionX - this.posX;
		var deltaY = directionY - this.posY;
		var mag = Math.sqrt(deltaX*deltaX+deltaY*deltaY)
		var veloScale = this.speed / mag;
		this.veloX = deltaX * veloScale;
		this.veloY = deltaY * veloScale;

		this.damage = damage;
		this.friendly = friendly;
		this.lifespan = lifespan*60;
	}

	tick(){
		this.tickTime++;
		// Wall collison
		var wall = false;
		for(var i=0;i<arrayWalls.length;i++) {
			if(this.isInRange(arrayWalls[i].getX(),
							  arrayWalls[i].getY(),
							  arrayWalls[i].getSize(),
							  this.posX,this.posY)){
				wall = true;
			}
		}


		// Taget collision
		if(this.friendly){
			for(var i=0;i<arrayEnemies.length;i++){
				var enemy = arrayEnemies[i];

				if(this.isInRange(enemy.getX()-enemy.getSize()/2,
								  enemy.getY()-enemy.getSize()/2,
								  enemy.getSize(),
								  this.posX,this.posY)){
					arrayEnemies[i].takeDamage(this.damage);
					this.alive = false;
				}
			}
		}
		else {
			if(this.isInRange(player.getX()-player.getSize()/2,
							  player.getY()-player.getSize()/2,
							  player.getSize(),
							  this.posX,this.posY)){
				player.takeDamage(this.damage);
				this.alive = false;
			}
		}

		if(this.lifespan == this.tickTime || wall){
			this.alive = false;
		}
		else {
			this.posX += this.veloX;
			this.posY += this.veloY;
		}

		return this.alive;
	}

	// get
	isFriendly(){
		return this.friendly;
	}
}
