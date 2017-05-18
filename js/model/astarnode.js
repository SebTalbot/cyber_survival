class AStarNode {
	constructor(x,y,cost,parent,dX,dY) {
		this.x = x;
		this.y = y;
		this.cost = cost;
		this.h = Math.abs(this.x-dX) + Math.abs(this.y-dY);
		this.score = this.cost + this.h;
		this.parent = parent;
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
