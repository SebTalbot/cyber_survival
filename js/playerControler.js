importScript("js/model/entities/player.js");
importScript("js/view/playerView.js");

class PlayerControler {
	constructor () {
		this.player = new Player(300,300,5,100,10,5);
		this.playerView = new PlayerView();
	}

	tick () {
		this.player.tick();
		this.playerView.draw(this.player.getX(), this.player.getY());
	}

	getPlayer(){ return this.player; }
}
