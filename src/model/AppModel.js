import HarmonicInstrument from './HarmonicInstrument';
import PercussiveInstrument from './PercussiveInstrument';
import AudioUtil from '../utils/AudioUtil';

export default class AppModel {
	constructor() {
		this.audioContext=new window.AudioContext();
		if (!this.audioContext)
			throw new Error("no web audio!");

		this.instruments=[];

		this.addInstrument(new PercussiveInstrument({
			"name": "Bad Jazz Drums",
			"labels": ["KICK","SNARE","HI-HAT"],
			"samples": [
				"samples/drums/bad-kick.wav",
				"samples/drums/bad-snare.wav",
				"samples/drums/bad-hihat.wav",
			]
		}));

		this.addInstrument(new PercussiveInstrument({
			"name": "Yes Drums",
			"labels": ["KICK","SNARE","HI-HAT 1","HI-HAT 2","HI-HAT 3"],
			"samples": [
				"samples/drums/yes-kick.mp3",
				"samples/drums/yes-snare.mp3",
				"samples/drums/thrl-hat_A_minor.wav",
				"samples/drums/vinyl-hat_90bpm_C.wav",
				"samples/drums/rock-hihat-tchik.wav"
			]
		}));

		this.addInstrument(new HarmonicInstrument({
			"name": "Dive Bass",
			"sample": "samples/bass/upright-bass-bombdive.mp3"
		}));

		this.addInstrument(new HarmonicInstrument({
			"name": "Acoustic Bass",
			"sampleNote": "F#",
			"sample": "samples/bass/acoustic_bass_f_sharp.mp3"
		}));

		this.addInstrument(new HarmonicInstrument({
			"name": "Piano",
			"sample": "samples/piano/piano-c.wav",
			"defaultVolume": 0.25
		}));
	}

	init() {
		let p=[];
		for (let i of this.instruments)
			p.push(i.load());

		this.initPromise=Promise.all(p);
		return this.initPromise;
	}

	addInstrument(instrument) {
		instrument.app=this;
		this.instruments.push(instrument);
	}

	getInstrumentByName(name) {
		for (let instrument of this.instruments)
			if (instrument.name==name)
				return instrument;
	}
}
