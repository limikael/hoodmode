import AudioUtil from '../utils/AudioUtil';
import ReconcileArray from '../utils/ReconcileArray';
import ConductorLayer from './ConductorLayer';
import ConductorInstrument from './ConductorInstrument';
import MusicUtil from '../utils/MusicUtil';

export default class Conductor {
	constructor() {
		this.audioContext=new window.AudioContext();
		if (!this.audioContext)
			throw new Error("no web audio!");

		this.instruments=ReconcileArray.createWithFactory(this.createInstrument);
		this.layers=ReconcileArray.createWithFactory(this.createLayer);
		this.currentNotes=[];
		this.sequenceIndex=-1;
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

	getConductorInstrumentByName(name) {
		for (let instrument of this.instruments.getItems()) {
			if (instrument.getName()==name)
				return instrument;
		}
	}

	getCurrentSong() {
		return this.state.songs[this.state.currentSongIndex];
	}

	getCurrentChordCents() {
		let chordIndex=this.state.currentChordIndex;
		if (this.state.playingSequence)
			chordIndex=this.getCurrentSong().chordSequence[this.sequenceIndex].chordIndex;

		let song=this.getCurrentSong();
		let scaleChordNotes=MusicUtil.getChordNotesForScale(song.musicKey,song.minor);
		let chordNotes=scaleChordNotes[chordIndex];
		return [
			MusicUtil.noteToCents(chordNotes[0]),
			MusicUtil.noteToCents(chordNotes[1]),
			MusicUtil.noteToCents(chordNotes[2])
		];
	}

	playInstrument(name, soundIndex) {
		let instrument=this.getConductorInstrumentByName(name);
		let note=instrument.createNote(soundIndex);
		note.setChordCents(this.getCurrentChordCents());
		note.connect(this.audioContext.destination);
		note.playNow();
	}

	onNoteEnded(note) {
		let idx=this.currentNotes.indexOf(note);
		if (idx<0)
			return;

		this.currentNotes.splice(idx,1);
	}

	playGridSlice(at, gridIndex) {
		let chordCents=this.getCurrentChordCents();

		for (let layer of this.layers.getItems()) {
			for (let soundIndex=0; soundIndex<layer.data.seq.length; soundIndex++) {
				if (layer.data.seq[soundIndex][gridIndex]) {
					let note=layer.instrument.createNote(soundIndex);
					note.connect(layer.destination);
					note.setChordCents(chordCents);
					note.playSheduled(at,layer.getNoteLen(gridIndex)*this.getSecPerGrid());
					note.setVelocity(layer.data.vel[gridIndex]);

					note.onended=this.onNoteEnded.bind(this,note);
					this.currentNotes.push(note);
				}
			}
		}
	}

	getSecPerGrid() {
		let secPerBeat=60/this.getCurrentSong().bpm;
		let secPerGrid=secPerBeat/4;

		return secPerGrid;
	}

	play=()=>{
		this.playStartTime=this.audioContext.currentTime;

		if (this.state.playingSequence) {
			this.sequenceIndex++;
			if (this.sequenceIndex>=this.getCurrentSong().chordSequence.length)
				this.sequenceIndex=0;
		}

		for (let gridIndex=0; gridIndex<16; gridIndex++) {
			this.playGridSlice(
				this.playStartTime+gridIndex*this.getSecPerGrid(),
				gridIndex);
		}

		this.playTimer=setTimeout(this.play,1000*16*this.getSecPerGrid());
	}

	stop() {
		clearTimeout(this.playTimer);
		this.playTimer=null;

		for (let note of this.currentNotes) {
			note.setVelocity(0);
			note.onended=null;
		}

		this.currentNotes=[];
	}

	isPlaying() {
		return !!this.playTimer;
	}

	setState=(state)=>{
		this.state=state;
		this.instruments.setData(state.instruments);
		this.layers.setData(this.getCurrentSong().layers);

		if (state.playing && !this.isPlaying())
			this.play();

		else if (!state.playing && this.isPlaying())
			this.stop();

		if (!state.playing || !state.playingSequence)
			this.sequenceIndex=-1;

		if (!state.playingSequence) {
			let currentChordCents=this.getCurrentChordCents();
			for (let note of this.currentNotes)
				note.setChordCents(currentChordCents);
		}
	};
}
