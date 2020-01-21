import "@babel/polyfill";
import InstrumentModel from '../InstrumentModel';
import AudioUtil from '../../utils/AudioUtil';

export default class BassInstrument extends InstrumentModel {
	constructor() {
		super("Bass");
		this.sampleNote="F#";
		this.sampleCents=AudioUtil.noteToCents(this.sampleNote);
	}

	async load() {
		let url="samples/acoustic_bass_f_sharp.mp3";
//		let url="samples/upright-bass-bombdive.mp3";
		this.buffer=await AudioUtil.loadBuffer(url,this.app.audioContext);
	}

	play(index, at, duration, volume) {
		if (!at)
			at=0;

		if (volume===undefined)
			volume=1;

		let gain=this.app.audioContext.createGain();
		gain.gain.value=volume;
		gain.connect(this.app.audioContext.destination);

		this.source=this.app.audioContext.createBufferSource();
		this.source.buffer=this.buffer;
		this.source.connect(gain);

		let cents;
		switch (index) {
			case 0:
				cents=this.app.getCurrentChordNoteCents(0);
				break;

			case 1:
				cents=this.app.getCurrentChordNoteCents(1);
				break;

			case 2:
				cents=this.app.getCurrentChordNoteCents(2);
				break;

			case 3:
				cents=this.app.getCurrentChordNoteCents(0)+AudioUtil.OCTAVE_CENTS;
				break;

			case 4:
				cents=this.app.getCurrentChordNoteCents(1)+AudioUtil.OCTAVE_CENTS;
				break;

			case 5:
				cents=this.app.getCurrentChordNoteCents(2)+AudioUtil.OCTAVE_CENTS;
				break;
		}

		cents-=this.sampleCents;
		this.source.detune.value=cents;
		this.source.start(at,0);

		if (duration)
			this.source.stop(at+duration);
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