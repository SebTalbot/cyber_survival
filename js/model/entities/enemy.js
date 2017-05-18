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
		// Merci a Frederic Theriault pour son exemple plus clair que ce que j'ai essaye
		var path = [];
		var open = [];
		var close = [];
		var resultNode = null;
		var currentNode = null;
		var x, y;
		var cost = 0;
		var inListNode = null;
		var node = null;
		var isSupportDiagonal = true;
		var isRoundDiagonalEdge = false;
		var iter = 0;

		open.push(new AStarNode(this.posX, this.posY, 0, null, this.destinationX, this.destinationY));
		while(open.length > 0){
			iter++
			var currentNodeInd = 0;
			currentNode = open[currentNodeInd];

			for(var i=0;i<open.length;i++){
				if(currentNode.score > open[i].score){
					currentNode = open[i];
					currentNodeInd = i;
				}
			}

			open.splice(currentNodeInd, 1);
			close[currentNode.x+"-"+currentNode.y] = 1;

			for(var i=0; i<(isSupportDiagonal ? 8 : 4); i++) {
				var diagAccepted = true;

				if (i == 0) {x = 0; y = -1 * this.speed}
				else if (i == 1) {x = 1 * this.speed; y = 0;}
				else if (i == 2) {x = 0; y = 1 * this.speed;}
				else if (i == 3) {x = -1 * this.speed; y = 0;}
				else if (i == 4) {x = -1 * this.speed; y = -1  * this.speed;}
				else if (i == 5) {x = 1 * this.speed; y = -1  * this.speed;}
				else if (i == 6) {x = -1 * this.speed; y =  1 * this.speed;}
				else if (i == 7) {x = 1 * this.speed; y =  1 * this.speed;}

				if (i > 3 && isSupportDiagonal && !isRoundDiagonalEdge) {
					if ((i == 4 && (map.walkCost(currentNode.x - 1 * this.speed, currentNode.y) == -1 || (map.walkCost(currentNode.x, currentNode.y - 1 * this.speed) == -1))) ||
						(i == 5 && (map.walkCost(currentNode.x + 1 * this.speed, currentNode.y) == -1 || (map.walkCost(currentNode.x, currentNode.y - 1 * this.speed) == -1))) ||
						(i == 6 && (map.walkCost(currentNode.x - 1 * this.speed, currentNode.y) == -1 || (map.walkCost(currentNode.x, currentNode.y + 1 * this.speed) == -1))) ||
						(i == 7 && (map.walkCost(currentNode.x + 1 * this.speed, currentNode.y) == -1 || (map.walkCost(currentNode.x, currentNode.y + 1 * this.speed) == -1)))) {
						diagAccepted = false;
					}
				}

				// if the node isn't an objstacle or part of closed list
				cost = map.walkCost(currentNode.x + x, currentNode.y + y);
				if (cost != -1 && diagAccepted &&
					close[(currentNode.x + x) + "-" + (currentNode.y + y)] == null) {
					node = new AStarNode(currentNode.x + x, currentNode.y + y, cost + (i > 3 ? 4 : 0), currentNode, this.destinationX, this.destinationY);
					inListNode = null;

					for (var j = 0; j < open.length; j++) {
						if (open[j].x == node.x && open[j].y == node.y) {
							inListNode = open[j];
							break;
						}
					}

					if (inListNode == null) {
						open.push(node);
					}
					else {
						if (node.score < inListNode.score) {
							inListNode = node;
						}
					}

					// check if node is target node. If so, done!
					if (Math.abs(node.x - this.destinationX) <  this.speed &&
						Math.abs(node.y - this.destinationY) <  this.speed) {
						resultNode = node;
						break;
					}
				}
			}

			if(resultNode != null) {
				break;
			}
		}

		// If the resultNod exists, backtrack and create a path
		if(resultNode != null) {
			var direction;
			path.unshift(resultNode);
			console.log(resultNode)

			while(resultNode.parent != null) {
				resultNode = resultNode.parent;
				path.unshift(resultNode);
			}
		}

		return path;
	}


	astarBackup() {
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
				Math.abs(node.y - node.dY) <= this.speed ) || open.length > 500){
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
