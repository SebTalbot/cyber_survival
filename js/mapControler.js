importScript("js/model/map.js");
importScript("js/view/mapView.js");

class MapControler {
	constructor () {
		this.map = new Map(1);
		this.mapView = new MapView();
	}

	tick () {
		this.mapView.draw(this.map.nbTilesX, this.map.nbTilesY, this.map.arrayTiles);
	}
}
