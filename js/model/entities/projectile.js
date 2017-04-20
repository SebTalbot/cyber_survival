class Projectile extends DynamicEntity {
	constructor(x, y, speed, directionX, directionY, lifespan){
		super(x, y, speed);
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
		if(this.lifespan == this.tickTime){
			this.alive = false;
		}
		else {
			this.posX += this.veloX;
			this.posY += this.veloY;
		}

		return this.alive;
	}
}
