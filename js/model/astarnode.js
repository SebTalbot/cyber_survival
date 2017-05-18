class AStarNode {
	constructor(x,y,cost,parent,dX,dY) {
		this.x = x;
		this.y = y;
		this.cost = cost;
		this.h = (Math.abs(this.x-dX) + Math.abs(this.y-dY)) * 10;
		this.score = this.cost + this.h;
		this.parent = parent;
	}
}
