class Projectile extends DynamicEntity {
	constructor(x, y, speed, directionX, directionY, lifespan){
		super(x, y, speed);
		this.size = 4;
		var deltaX = directionX - this.posX;
		var deltaY = directionY - this.posY;
		var mag = Math.sqrt(deltaX*deltaX+deltaY*deltaY)
		var veloScale = this.speed / mag;
		this.veloX = deltaX * veloScale;
		this.veloY = deltaY * veloScale;
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

		if(this.lifespan == this.tickTime || wall){
			this.alive = false;
		}
		else {
			this.posX += this.veloX;
			this.posY += this.veloY;
		}

		return this.alive;
	}
}
