import "@babel/polyfill";
import InstrumentModel from './InstrumentModel';
import AudioUtil from '../utils/AudioUtil';
//import InstrumentNote from './InstrumentNote';

export default class HarmonicInstrument extends InstrumentModel {
	constructor(options) {
		super(options.name);

		if (!options.sampleNote)
			options.sampleNote="C";

		this.options=options;
		this.sampleCents=AudioUtil.noteToCents(this.options.sampleNote);

		if (options.defaultVolume)
			this.defaultVolume=options.defaultVolume;
	}

	async load() {
		let url=this.options.sample;
		this.buffer=await AudioUtil.loadBuffer(url,this.app.audioContext);
	}

	createNote(soundIndex) {
		let note=new InstrumentNote(this.app, this.buffer, soundIndex);
		note.setSampleNoteCents(this.sampleCents);

		return note
	}

	getSoundLabels() {
		return [
			"T1",
			"T2",
			"T3",
			"O-T1",
			"O-T2",
			"O-T3"
		];
	}
}