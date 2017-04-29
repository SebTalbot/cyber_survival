class Enemy extends LivingEntity{
	constructor (x,y,speed,maxHealth,damage,attackRate) {
		super(x,y,speed,maxHealth,damage,attackRate);
		this.size = 50;
	}

	tick(){
		this.checkHealth();

		// Movement
		var newX = this.posX;
		var newY = this.posY;

		return this.alive;
	}

	// chooseDestination() {
	// 	// find tile
	// 	var tileX = (this.posX-(this.posX%map.tileScale))/map.tileScale;
	// 	var tileY = (this.posY-(this.posY%map.tileScale))/map.tileScale;
    //
	// 	// looking arround
	// 	//					north,n-e,east,s-e,south,s-w,west,n-w
	// 	var posibilities = [true,true,true,true,true,true,true,true];
    //
	// 	if(map.getArrayTiles()[tileY-1][tileX]==1)   {posibilities[0] = false;}
	// 	if(map.getArrayTiles()[tileY-1][tileX+1]==1) {posibilities[1] = false;}
	// 	if(map.getArrayTiles()[tileY][tileX+1]==1)   {posibilities[2] = false;}
	// 	if(map.getArrayTiles()[tileY+1][tileX+1]==1) {posibilities[3] = false;}
	// 	if(map.getArrayTiles()[tileY+1][tileX]==1)   {posibilities[4] = false;}
	// 	if(map.getArrayTiles()[tileY+1][tileX-1]==1) {posibilities[5] = false;}
	// 	if(map.getArrayTiles()[tileY][tileX-1]==1)   {posibilities[6] = false;}
	// 	if(map.getArrayTiles()[tileY-1][tileX-1]==1) {posibilities[7] = false;}
    //
	// 	// Priorities
	// 	var yPlus = [false,false,false,true,true,true,false,false];
	// 	var yMinus = [true,true,false,false,false,false,false,true];
	// 	var yNeutral = [false,false,true,false,false,false,false,true,false];
    //
	// 	var xPlus = [false,true,true,true,false,false,false,false];
	// 	var xMinus = [false,false,false,false,false,true,true,true];
	// 	var xNeutral = [true,false,false,false,true,false,false,false];
    //
	// 	var priorities = [];
	// 	var choices = [];
    //
	// 	// if X is neutral
	// 	if(Math.abs(this.posX-this.destinationFinalX) <= this.speed){
	// 		if(this.posY < this.destinationFinalY){
	// 			priorities = yMinus;
	// 		}
	// 		else {
	// 			priorities = yPlus;
	// 		}
    //
	// 		// Check if there is posibilities
	// 		for(var i = 0; i < 8; i++){
	// 			if(priorities[i] && posibilities[i])
	// 				choices.push(i);
	// 		}
    //
	// 		// if there is no posibilities check with a neutral state
	// 		if(choices.length == 0){
	// 			priorities = yNeutral;
	// 			for(var i = 0; i < 8; i++){
	// 				if(priorities[i] && posibilities[i])
	// 					choices.push(i);
	// 			}
	// 		}
	// 	}
	// 	// if Y is neutral
	// 	else if(Math.abs(this.posY-this.destinationFinalY) <= this.speed){
	// 		console.log("y")
	// 		if(this.posX < this.destinationFinalX){
	// 			priorities = xMinus;
	// 		}
	// 		else {
	// 			priorities = xPlus;
	// 		}
    //
	// 		// Check if there is posibilities
	// 		for(var i = 0; i < 8; i++){
	// 			if(priorities[i] && posibilities[i])
	// 				choices.push(i);
	// 		}
    //
	// 		// if there is no posibilities check with a neutral state
	// 		if(choices.length == 0){
	// 			priorities = xNeutral;
	// 			for(var i = 0; i < 8; i++){
	// 				if(priorities[i] && posibilities[i])
	// 					choices.push(i);
	// 			}
	// 		}
	// 	}
	// 	// if none are neutral
	// 	else{
	// 		if(this.posX < this.destinationFinalX){
	// 			if(this.posY < this.destinationFinalY){
	// 				for(var i = 0; i < 8; i++){
	// 					priorities[i] = xMinus[i] || yMinus[i];
	// 				}
	// 			}
	// 			else {
	// 				for(var i = 0; i < 8; i++){
	// 					priorities[i] = xMinus[i] || yPlus[i];
	// 				}
	// 			}
	// 		}
	// 		else{
	// 			if(this.posY < this.destinationFinalY){
	// 				for(var i = 0; i < 8; i++){
	// 					priorities[i] = xPlus[i] || yMinus[i];
	// 				}
	// 			}
	// 			else {
	// 				for(var i = 0; i < 8; i++){
	// 					priorities[i] = xPlus[i] || yPlus[i];
	// 				}
	// 			}
	// 		}
    //
	// 		// Check if there is posibilities
	// 		for(var i = 0; i < 8; i++){
	// 			if(priorities[i] && posibilities[i])
	// 				choices.push(i);
	// 		}
    //
	// 		// if there is no posibilities check with a neutral state
	// 		if(choices.length == 0){
	// 			for(var i = 0; i < 8; i++){
	// 				priorities[i] = xNeutral[i] || xNeutral[i];
	// 			}
    //
	// 			for(var i = 0; i < 8; i++){
	// 				if(priorities[i] && posibilities[i])
	// 					choices.push(i);
	// 			}
	// 		}
	// 	}
    //
	// 	// Final choice
	// 	var random = Math.floor(Math.random() * (choices.length )) ;
	// 	var choice = choices[random];
    //
	// 	if(choice == 0){
	// 		this.destinationTempY -= map.tileScale/2;
	// 	}
	// 	else if(choice == 1){
	// 		this.destinationTempX += map.tileScale/2;
	// 		this.destinationTempY -= map.tileScale/2;
	// 	}
	// 	else if(choice == 2){
	// 		this.destinationTempX += map.tileScale/2;
	// 	}
	// 	else if(choice == 3){
	// 		this.destinationTempX += map.tileScale/2;
	// 		this.destinationTempY += map.tileScale/2;
	// 	}
	// 	else if(choice == 4){
	// 		this.destinationTempY += map.tileScale/2;
	// 	}
	// 	else if(choice == 5){
	// 		this.destinationTempX -= map.tileScale/2;
	// 		this.destinationTempY += map.tileScale/2;
	// 	}
	// 	else if(choice == 6){
	// 		this.destinationTempX -= map.tileScale/2;
	// 	}
	// 	else if(choice == 7){
	// 		this.destinationTempX -= map.tileScale/2;
	// 		this.destinationTempY -= map.tileScale/2;
	// 	}
    //
	// 	console.log(choice)
	// }
}
