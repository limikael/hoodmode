import AudioUtil from '../utils/AudioUtil';
import ReconcileArray from '../utils/ReconcileArray';
import ConductorLayer from './ConductorLayer';
import ConductorInstrument from './ConductorInstrument';

export default class Conductor {
	constructor() {
		this.audioContext=new window.AudioContext();
		if (!this.audioContext)
			throw new Error("no web audio!");

		this.instruments=ReconcileArray.createWithFactory(this.createInstrument);
		this.layers=ReconcileArray.createWithFactory(this.createLayer);
	}

	loadInstruments() {
		let promises=[];
		for (let instrument of this.instruments.getItems())
			promises.push(instrument.load());

		return Promise.all(promises);
	}

	createLayer=(data)=>{
		return new ConductorLayer(this,data);
	};

	createInstrument=(data)=>{
		return new ConductorInstrument(this,data);
	};

	setState=(state)=>{
		this.instruments.setData(state.instruments);
		this.layers.setData(state.songs[state.currentSongIndex].layers);
		this.state=state;
	};

	getConductorInstrumentByName(name) {
		for (let instrument of this.instruments.getItems()) {
			if (instrument.getName()==name)
				return instrument;
		}
	}

	playInstrument(name, soundIndex) {
		let instrument=this.getConductorInstrumentByName(name);
		let note=instrument.createNote(soundIndex);
		note.connect(this.audioContext.destination);
		note.playNow();
	}

	playGridSlice(at, gridIndex) {
		let layers=this.layers.getItems();

		for (let layer of layers) {
			for (let soundIndex=0; soundIndex<layer.data.seq.length; soundIndex++) {
				if (layer.data.seq[soundIndex][gridIndex]) {
					let note=layer.instrument.createNote(soundIndex);
					note.connect(this.audioContext.destination);
					note.playSheduled(at,1000);
				}
			}
		}
	}

	play() {
		let secPerBeat=60/100;
		let secPerGrid=secPerBeat/4;

		this.playStartTime=this.audioContext.currentTime;

		for (let gridIndex=0; gridIndex<16; gridIndex++) {
			this.playGridSlice(
				this.playStartTime+gridIndex*secPerGrid,
				gridIndex);
		}
	}
}
