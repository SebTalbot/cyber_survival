class Enemy extends LivingEntity{
	constructor (speed,maxHealth,damage,attackRate,visionRange,attackRange) {
		super(speed,maxHealth,damage,attackRate);
		this.id = 0;
		this.visionRange = visionRange;
		this.attackRange = attackRange;
		this.size = 40;
		this.path = [];
		this.choseDestination();
	}

	detectPlayer() {
		var ret = false;
		var dX = Math.abs(player.getX() - this.posX);
		var dY = Math.abs(player.getY() - this.posY);

		if((dX^2)+(dY^2) <= (this.visionRange^2)){
			ret = true;
		}

		return ret;
	}

	isInAttackRange() {
		var ret = false;
		var dX = Math.abs(player.getX() - this.posX);
		var dY = Math.abs(player.getY() - this.posY);

		if((dX^2)+(dY^2) <= (this.attackRange^2)){
			ret = true;
		}

		return ret;
	}

	astar() {
		// Init
		var startNode = new AStarNode(this.posX, this.posY, this.destinationX, this.destinationY);
		var open = [startNode];
		var close = [];

		while(open.length != 0){
			// Chose lowest cost node
			var nodeIndex = 0;
			for(var i=0;i<open.length;i++){
				if(open[i].costTotal < open[nodeIndex].costTotal){nodeIndex=i;}
			}
			var node = open[nodeIndex];

			if((Math.abs(node.x - node.dX) <= this.speed &&
				Math.abs(node.y - node.dY) <= this.speed ) || open.length > 150){
				var currentNode = node;
				var ret = [];
				while(currentNode.parent != null){
					ret.unshift(currentNode);
					currentNode = currentNode.parent;
				}
				open = [];
			}
			else {
				open.splice(nodeIndex,1);
				close.push(node);

				var neighbors = node.neighbors(this.speed);
				for(var i=0;i<neighbors.length;i++){
					if(!this.hasCollideBoth(neighbors[i].x,neighbors[i].y)){
						var validNeighbor = true;
						for(var j=0;j<close.length;j++){
							if(close[j].x == neighbors[i].x &&
								close[j].y == neighbors[i].y) {
								validNeighbor = false;
							}
						}

						if(validNeighbor){
							neighbors[i].costFromStart = node.costFromStart+1;
							neighbors[i].parent = node;
							var costFromStartBest = true;

							for(var j=0;j<open.length;j++){
								if((open[j].x == neighbors[i].x &&
								   open[j].y == neighbors[i].y) ||
								   open[j].costFromStart > neighbors[i].costFromStart){
									costFromStartBest = false;
								}
							}

							if(costFromStartBest){
								open.push(neighbors[i]);
							}
						}
					}
				}
			}
		}
		return ret;
	}

	choseDestination() {
		var dX = Math.floor(Math.random() * (map.getNbTilesX()*map.tileScale));
		var dY = Math.floor(Math.random() * (map.getNbTilesY()*map.tileScale));

		while(this.hasCollideBoth(dX,dY)){
			dX = Math.floor(Math.random() * (map.getNbTilesX()*map.tileScale));
			dY = Math.floor(Math.random() * (map.getNbTilesY()*map.tileScale));
		}
		this.destinationX = dX;
		this.destinationY = dY;
	}

	getId(){ return this.id;}
}
