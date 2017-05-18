class Enemy extends LivingEntity{
	constructor (speed,maxHealth,damage,attackRate,visionRange,attackRange) {
		super(speed,maxHealth,damage,attackRate);
		this.id = 0;
		this.visionRange = visionRange;
		this.attackRange = attackRange;
		this.size = 40;
		this.path = [];
		this.gotShot = false;
	}

	detectPlayer() {
		var ret = false;
		var dX = Math.abs(player.posX - this.posX);
		var dY = Math.abs(player.posY - this.posY);
		if((dX^2)+(dY^2) <= (this.visionRange^2)){

			ret = true;
		}

		return ret;
	}

	isInAttackRange() {
		var ret = false;
		var dX = Math.abs(player.posX - this.posX);
		var dY = Math.abs(player.posY - this.posY);

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
		var isRoundDiagonalEdge = true;

		open.push(new AStarNode(this.posX, this.posY, 0, null, this.destinationX, this.destinationY));
		while(open.length > 0){
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

				// condition pour accepter une node
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

					// condition pour sortir de la loop et refermer le path
					if ((Math.abs(node.x - this.destinationX) <  this.speed &&
						Math.abs(node.y - this.destinationY) <  this.speed)) {
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

			while(resultNode.parent != null) {
				resultNode = resultNode.parent;
				path.unshift(resultNode);
			}
		}

		return path;
	}

	choseDestination() {
		// Chose a destination to randomly patrol. Helps the Astar to avoid infinit loop
		// There is 3 levels of array to have a less ugly patrol
		var arrayFirst = map.getArrayOfSurrounds(this.posX, this.posY);
		var arraySecond = [];
		for(var i=0; i<arrayFirst.length;i++){
			var x = arrayFirst[i][0];
			var y = arrayFirst[i][1];
			arraySecond.push([x,y]);
			var temp = map.getArrayOfSurrounds(x,y);
			for(var j=0; j<temp.length; j++){
				x = temp[j][0];
				y = temp[j][1];
				arraySecond.push([x,y]);
			}

		}
		var arrayThird = [];
		for(var i=0; i<arraySecond.length;i++){
			var x = arraySecond[i][0];
			var y = arraySecond[i][1];
			arrayThird.push([x,y]);
			var temp = map.getArrayOfSurrounds(x,y);
			for(var j=0; j<temp.length; j++){
				x = temp[j][0];
				y = temp[j][1];
				arrayThird.push([x,y]);
			}

		}

		var rand = Math.floor(Math.random()*(arrayThird.length-1));
		var minX = arrayThird[rand][0]*map.tileScale;
		var maxX = (arrayThird[rand][0]+1)*map.tileScale;
		var dX = Math.floor(Math.random()*(maxX-minX)) + minX;
		var minY = arrayThird[rand][1]*map.tileScale;
		var maxY = (arrayThird[rand][1]+1)*map.tileScale;
		var dY = Math.floor(Math.random()*(maxY-minY)) + minY;

		this.destinationX = dX;
		this.destinationY = dY;
	}
}
