import LayerModel from './LayerModel';
import AudioUtil from '../utils/AudioUtil';

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

	getObjectData() {
		let layerData=[];
		for (let layer of this.layers)
			layerData.push(layer.getObjectData());

		return {
			name: this.name,
			chordSequence: this.chordSequence,
			key: this.key,
			minor: this.minor,
			bpm: this.bpm,
			layers: layerData
		}
	}

	applyObjectData(data) {
		this.name=data.name;
		this.chordSequence=data.chordSequence;

		if (!isNaN(parseInt(data.key)))
			this.key=AudioUtil.NOTE_NAMES[parseInt(data.key)];

		else
			this.key=data.key;

		this.minor=data.minor;
		this.bpm=data.bpm;

		for (let layerData of data.layers) {
			let layer=new LayerModel(this.app.getInstrumentByName(layerData.instrumentName));
			this.addLayer(layer);
			layer.applyObjectData(layerData);
		}
	}
}