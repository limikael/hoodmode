import "@babel/polyfill";
import InstrumentModel from './InstrumentModel';
import AudioUtil from '../utils/AudioUtil';

export default class PercussiveInstrument extends InstrumentModel {
	constructor(options) {
		super(options.name);

		this.options=options;
	}

	getSoundLabels() {
		return this.options.labels;
	}

	play(index, at) {
		if (!at)
			at=0;

		this.source=this.app.audioContext.createBufferSource();
		this.source.buffer=this.buffers[index];
		this.source.connect(this.app.audioContext.destination);

		this.source.start(at);
	}

	async load() {
		this.buffers=[];

		for (let url of this.options.samples)
			this.buffers.push(await AudioUtil.loadBuffer(url,this.app.audioContext));
	}
}