import "@babel/polyfill";
import InstrumentModel from '../InstrumentModel';
import AudioUtil from '../../utils/AudioUtil';

export default class DrumInstrument extends InstrumentModel {
	constructor() {
		super("Drums");
	}

	getSoundLabels() {
		return [
			"KICK",
			"SNARE",
			"HI-HAT"
		];
	}

	play(index, at) {
		if (!at)
			at=0;

		this.source=this.app.audioContext.createBufferSource();
		this.source.buffer=this.buffer;
		this.source.connect(this.app.audioContext.destination);

		switch (index) {
			case 0:
				this.source.start(at,1.106,.25);
				break;

			case 1:
				this.source.start(at,1.428,.25);
				break;

			case 2:
				this.source.start(at,2.217,.25);
				break;
		}
	}

	async load() {
		let url="samples/simple-jazz-beats.wav";
		this.buffer=await AudioUtil.loadBuffer(url,this.app.audioContext);
	}
}