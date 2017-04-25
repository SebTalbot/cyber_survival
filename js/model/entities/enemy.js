class Enemy extends LivingEntity{
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed,maxHealth,damage,attackRate);
		this.size = 50;
		this.destinationX = x;
		this.destinationY = y;
	}

	tick(){
		this.checkHealth();
		this.chooseDestination();

		return this.alive;
	}

	chooseDestination() {
		// find tile
		var tileX = (this.posX-(this.posX%map.tileScale))/map.tileScale;
		var tileY = (this.posY-(this.posY%map.tileScale))/map.tileScale;

		// looking arround
		var n = true;
		var nE = true;
		var e = true;
		var sE = true;
		var s = true;
		var sW = true;
		var w = true;
		var nW = true;

		if(map.getArrayTiles()[tileY-1][tileX] == 1) { n = false;}
		if(map.getArrayTiles()[tileY-1][tileX+1] == 1) { nE = false;}
		if(map.getArrayTiles()[tileY-1][tileX-1] == 1) { nW = false;}
		if(map.getArrayTiles()[tileY][tileX+1] == 1) { e = false;}
		if(map.getArrayTiles()[tileY+1][tileX+1] == 1) { sE = false;}
		if(map.getArrayTiles()[tileY+1][tileX] == 1) { s = false;}
		if(map.getArrayTiles()[tileY+1][tileX-1] == 1) { sW = false;}
		if(map.getArrayTiles()[tileY][tileX-1] == 1) { w = false;}

		console.log(n,e,s,w)

	}
}
