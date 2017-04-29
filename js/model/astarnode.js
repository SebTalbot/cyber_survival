class AStarNode {
	constructor(x,y,destinationX,destinationY) {
		this.x = x;
		this.y = y;
		this.dX = destinationX;
		this.dY = destinationY;
		this.costFromStart = 0;
		this.costToGoal = Math.abs(this.x-this.dX) +
						  Math.abs(this.y-this.dY);
		this.costTotal = this.costFromStart + this.costToGoal;
		this.parent = null;
	}

	neighbors(speed) {
		var ret = [];

		ret.push(new AStarNode(this.x+speed, this.y+speed, this.dX, this.dY));
		ret.push(new AStarNode(this.x+speed, this.y-speed, this.dX, this.dY));
		ret.push(new AStarNode(this.x-speed, this.y+speed, this.dX, this.dY));
		ret.push(new AStarNode(this.x-speed, this.y-speed, this.dX, this.dY));

		ret.push(new AStarNode(this.x+speed, this.y, this.dX, this.dY));
		ret.push(new AStarNode(this.x-speed, this.y, this.dX, this.dY));
		ret.push(new AStarNode(this.x, this.y+speed, this.dX, this.dY));
		ret.push(new AStarNode(this.x, this.y-speed, this.dX, this.dY));

		return ret;
	}
}
