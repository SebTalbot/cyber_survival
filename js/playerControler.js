importScript("js/model/entities/player.js");
importScript("js/view/playerView.js");

class PlayerControler {
	constructor () {
		this.player = new Player();
		this.playerView = new PlayerView(50);
	}

	tick () {
		this.player.tick();
		this.playerView.draw(this.player.getX(), this.player.getY());
	}
}
