import LayerModel from './LayerModel';
import BassInstrument from './instruments/BassInstrument';
import PianoInstrument from './instruments/PianoInstrument';
import DrumInstrument from './instruments/DrumInstrument';

export default class AppModel {
	constructor() {
		this.layers=[];
		this.instruments=[];

		this.audioContext=new window.AudioContext();
		if (!this.audioContext)
			throw new Error("no web audio!");

		this.addInstrument(new DrumInstrument());
		this.addInstrument(new BassInstrument());
		this.addInstrument(new PianoInstrument());
	}

	init() {
		let p=[];
		for (let i of this.instruments)
			p.push(i.load());

		this.initPromise=Promise.all(p);
		return this.initPromise;
	}

	addLayer(layer) {
		layer.app=this;
		this.layers.push(layer);
	}

	addInstrument(instrument) {
		instrument.app=this;
		this.instruments.push(instrument);
	}
}
