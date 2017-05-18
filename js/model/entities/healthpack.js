class HealthPack extends Entity {
	constructor(x, y){
		super(x,y);
		this.size = 30;
	}

	tick(){
		if(this.isInRange(player.getX()-player.getSize()/2,
						  player.getY()-player.getSize()/2,
						  player.getSize(),
						  this.posX,this.posY)){
			player.gainHealth(player.maxHealth/10);
			if(!this.penetrate){
				this.alive = false;
			}
		}

		return this.alive;
	}
}
