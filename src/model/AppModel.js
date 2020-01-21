import LayerModel from './LayerModel';
import HarmonicInstrument from './HarmonicInstrument';
import PercussiveInstrument from './PercussiveInstrument';
import AudioUtil from '../utils/AudioUtil';

export default class AppModel {
	constructor() {
		this.layers=[];
		this.instruments=[];
		this.bpm=100;
		this.currentChordIndex=0;
		this.chordLabels=[
			"A-", "B (dim)", "C", "D-",
			"E-", "F", "G",
		];

		this.chordNotes=[
			["A","C","E"],
			["B","D","F"],
			["C","E","G"],
			["D","F","A"],
			["E","G","B"],
			["F","A","C"],
			["G","B","D"],
		];

		this.audioContext=new window.AudioContext();
		if (!this.audioContext)
			throw new Error("no web audio!");

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

	deleteLayer(layer) {
		let idx=this.layers.indexOf(layer)

		if (idx>=0)
			this.layers.splice(idx,1);
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

	getChordLabels() {
		return this.chordLabels;
	}

	getCurrentChordNoteCents(triadNote) {
		let chordNotes=this.chordNotes[this.currentChordIndex];
		return AudioUtil.noteToCents(chordNotes[triadNote]);
	}
}
