class Map {
	constructor(id) {
		this.arrayTiles = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1],
			[1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1],
			[1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1],
			[1,2,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,2,1],
			[1,0,0,0,0,0,0,1,1,0,0,0,2,0,0,0,1,1,0,0,0,0,0,0,1],
			[1,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,1],
			[1,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,1],
			[1,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,1],
			[1,0,0,0,0,0,0,1,1,0,0,0,2,0,0,0,1,1,0,0,0,0,0,0,1],
			[1,2,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,2,1],
			[1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1],
			[1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1],
			[1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		];
		this.nbTilesX = this.arrayTiles[0].length;
		this.nbTilesY = this.arrayTiles.length;
		this.tileScale = 200;
	}

	getPositionInArray(x,y){
		var result = [];
		result[0] = (x-(x%this.tileScale))/this.tileScale;
		result[1] = (y-(y%this.tileScale))/this.tileScale;
		return result;
	}

	getRandomSpawn(size){
		var posX = 0;
		var posY = 0;
		var spawnArray = [];

		// Get spawns
		for(var i=0;i<this.arrayTiles.length;i++){
			for(var j=0;j<this.arrayTiles[0].length;j++){
				if(this.arrayTiles[i][j] == 2){
					spawnArray.push([i,j]);
				}
			}
		}

		// Chose random spawn
		var rand = Math.floor((Math.random() * (spawnArray.length-1)));

		// Chose random position on spawn
		var max = (spawnArray[rand][1]+1)*this.tileScale-size;
		var min = spawnArray[rand][1]*this.tileScale+size;
		posX = Math.floor((Math.random() * (max - min)) + min);

		max = (spawnArray[rand][0]+1)*this.tileScale-size;
		min = spawnArray[rand][0]*this.tileScale+size;
		posY = Math.floor((Math.random() * (max - min)) + min);

		return [posX,posY];
	}

	getArrayOfSurrounds(x,y){
		var pos = this.getPositionInArray(x,y);
		x = pos[0];
		y = pos[1];
		var result = [];

		if(y-1 >= 0){
			if(x-1 >= 0){
				if(this.arrayTiles[y-1][x-1] != 1){
					result.push([x-1,y-1]);
				}
			}
			if(x+1 <= this.nbTilesX-1){
				if(this.arrayTiles[y-1][x+1] != 1){
					result.push([x+1,y-1]);
				}
			}
			if(this.arrayTiles[y-1][x] != 1){
				result.push([x,y-1]);
			}
		}
		if(y+1 >= 0){
			if(x-1 >= 0){
				if(this.arrayTiles[y+1][x-1] != 1){
					result.push([x-1,y+1]);
				}
			}
			if(x+1 <= this.nbTilesX-1){
				if(this.arrayTiles[y+1][x+1] != 1){
					result.push([x+1,y+1]);
				}
			}
			if(this.arrayTiles[y+1][x] != 1){
				result.push([x,y+1]);
			}
		}
		if(x-1 >= 0){
			if(this.arrayTiles[y][x-1] != 1){
				result.push([x-1,y]);
			}
		}
		if(x+1 <= this.nbTilesX-1){
			if(this.arrayTiles[y][x+1] != 1){
				result.push([x+1,y]);
			}
		}

		return result;
	}

	walkCost(x,y){
		var pos = this.getPositionInArray(x,y);

		return (this.arrayTiles[pos[1]][pos[0]] == 1) ? -1:10;
	}
}
