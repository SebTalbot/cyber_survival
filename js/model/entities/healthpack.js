class HealthPack extends Entity {
	constructor(x, y){
		super(x,y);
		this.size = 30;
	}

	tick(){
		if(this.isInRange(player.posX-player.size/2,
						  player.posY-player.size/2,
						  player.size,
						  this.posX,this.posY)){
			player.gainHealth(player.maxHealth/10);
			if(!this.penetrate){
				this.alive = false;
			}
		}

		return this.alive;
	}
}
