export default class SongModel {
	constructor(name) {
		this.name=name;
		this.chordSequence=[0];
		this.key="A";
		this.minor=true;
		this.bpm=100;
		this.layers=[];
	}

	setApp(app) {
		this.app=app;
	}

	addLayer(layer) {
		if (!this.app)
			throw new Error("can't add layer, song is not in app!");

		layer.setSong(this);
		this.layers.push(layer);
	}

	deleteLayer(layer) {
		let idx=this.layers.indexOf(layer)

		if (idx>=0)
			this.layers.splice(idx,1);
	}

	setKey(key, minor) {
		this.key=key;
		this.minor=minor;
	}
}