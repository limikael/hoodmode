import "@babel/polyfill";
import InstrumentModel from './InstrumentModel';
import AudioUtil from '../utils/AudioUtil';
//import InstrumentNote from './InstrumentNote';

export default class PercussiveInstrument extends InstrumentModel {
	constructor(options) {
		super(options.name);

		this.options=options;
	}

	getSoundLabels() {
		return this.options.labels;
	}

	createNote(soundIndex) {
		return new InstrumentNote(this.app, this.buffers[soundIndex]);
	}

	async load() {
		this.buffers=[];

		for (let url of this.options.samples)
			this.buffers.push(await AudioUtil.loadBuffer(url,this.app.audioContext));
	}
}