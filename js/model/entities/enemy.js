class Enemy extends LivingEntity{
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed,maxHealth,damage,attackRate);
		this.size = 40;
		this.path = [];
	}

	tick(){
		this.checkHealth();

		if(this.path.length != 0){
			this.posX = this.path[0].x
			this.posY = this.path[0].y
			this.path.splice(0,1);
		}
		else{
			this.choseDestination();
			this.path = this.astar();
		}

		return this.alive;
	}

	astar() {
		// Init
		var startNode = new AStarNode(this.posX, this.posY, this.destinationX, this.destinationY);
		var open = [startNode];
		var close = [];

		while(open.length != 0){
			console.log(open.length)
			// Chose lowest cost node
			var nodeIndex = 0;
			for(var i=0;i<open.length;i++){
				if(open[i].costTotal < open[nodeIndex].costTotal){nodeIndex=i;}
			}
			var node = open[nodeIndex];

			if(Math.abs(node.x - node.dX) <= this.speed &&
			   Math.abs(node.y - node.dY) <= this.speed ){
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
}
