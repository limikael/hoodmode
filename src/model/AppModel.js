import LayerModel from './LayerModel';
import BassInstrument from './instruments/BassInstrument';
import PianoInstrument from './instruments/PianoInstrument';
import DrumInstrument from './instruments/DrumInstrument';

export default class AppModel {
	constructor() {
		this.layers=[];
		this.instruments=[];
		this.bpm=100;

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

	isPlaying() {
		return !!this.playTimer;
	}

	stop() {
		clearTimeout(this.playTimer);
		this.playTimer=null;
	}

	play=()=>{
		this.playStartTime=this.audioContext.currentTime;

		for (let layer of this.layers)
			layer.play(this.playStartTime);

		this.playTimer=setTimeout(this.play,4*1000*60/this.bpm);
	}
}
