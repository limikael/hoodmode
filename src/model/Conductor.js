import AudioUtil from '../utils/AudioUtil';
import ReconcileArray from '../utils/ReconcileArray';
import ConductorLayer from './ConductorLayer';
import ConductorInstrument from './ConductorInstrument';
import MusicUtil from '../utils/MusicUtil';
import AudioTimer from '../utils/AudioTimer';

export default class Conductor {
	constructor() {
		this.audioContext=new window.AudioContext();
		if (!this.audioContext)
			throw new Error("no web audio!");

		this.audioTimer=new AudioTimer(this.audioContext);
		this.audioTimer.onTick=this.onPlayTick;

		this.instruments=ReconcileArray.createWithFactory(this.createInstrument);
		this.layers=ReconcileArray.createWithFactory(this.createLayer);
		this.currentNotes=[];
		this.playingSequenceIndex=-1;
		this.playingSequenceChordIndex=-1;
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

	getChordCents(chordIndex) {
		let song=this.getCurrentSong();
		if (!song || chordIndex<0)
			return [0,0,0];

		let scaleChordNotes=MusicUtil.getChordNotesForScale(song.musicKey,song.minor);
		let chordNotes=scaleChordNotes[chordIndex];
		return [
			MusicUtil.noteToCents(chordNotes[0]),
			MusicUtil.noteToCents(chordNotes[1]),
			MusicUtil.noteToCents(chordNotes[2])
		];
	}

	getCurrentChordCents() {
		return this.getChordCents(this.state.currentChordIndex);
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

	getSecPerGrid() {
		let secPerBeat=60/this.getCurrentSong().bpm;
		let secPerGrid=secPerBeat/4;

		return secPerGrid;
	}

	getSecPerBar() {
		return this.getSecPerGrid()*16;
	}

	playGridSlice(at, gridIndex, chordCents) {
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

	playBar(at, chordCents) {
		for (let gridIndex=0; gridIndex<16; gridIndex++) {
			this.playGridSlice(
				at+gridIndex*this.getSecPerGrid(),
				gridIndex,
				chordCents
			);
		}
	}

	onPlayTick=(tickIndex)=>{
		let song=this.getCurrentSong();

		let barIndex=Math.floor(tickIndex/16);
		let gridIndex=tickIndex%16;

		if (gridIndex==0 && this.playingSequenceIndex>=0) {
			this.playingSequenceChordIndex++;

			if (this.playingSequenceChordIndex>=song.sections[this.playingSequenceIndex].length)
				this.playingSequenceChordIndex=0;
		}

		if (barIndex==0 && tickIndex==0) {
			let cents=this.getCurrentChordCents();

			this.playBar(
				this.audioTimer.startTime,
				cents
			);
		}

		if (gridIndex==15) {
			this.playBar(
				this.audioTimer.startTime+(barIndex+1)*this.getSecPerBar(),
				this.getCurrentChordCents()
			);
		}

		if (this.onPlayGridIndexChange)
			this.onPlayGridIndexChange(gridIndex,this.playingSequenceChordIndex);
	}

	play=()=>{
		let song=this.getCurrentSong();
		this.playBpm=song.bpm;

		this.playingSequenceIndex=this.state.currentSectionIndex;
		this.playingSequenceChordIndex=-1;

		this.audioTimer.setStartTime(this.audioContext.currentTime);
		this.audioTimer.setTickInterval(this.getSecPerGrid());
		this.audioTimer.start();
	}

	stop() {
		if (this.onPlayGridIndexChange)
			this.onPlayGridIndexChange(-1,-1);

		this.playBpm=0;
		this.audioTimer.stop();

		for (let note of this.currentNotes) {
			note.setVelocity(0);
			note.onended=null;
		}

		this.currentNotes=[];
	}

	isPlaying() {
		return this.audioTimer.isRunning();
	}

	setState=(state)=>{
		this.state=state;
		this.instruments.setData(state.instruments);

		if (this.getCurrentSong()) {
			this.layers.setData(this.getCurrentSong().layers);
			if (state.playing && !this.isPlaying())
				this.play();

			else if (!state.playing && this.isPlaying())
				this.stop();

			if (this.isPlaying() && this.playBpm!=this.getCurrentSong().bpm) {
				this.stop();
				this.play();
			}
		}

		else {
			this.stop();
			this.layers.setData([]);
		}

		if (state.currentSectionIndex<0) {
			this.playingSequenceIndex=-1;
			this.playingSequenceChordIndex=-1
			let currentChordCents=this.getCurrentChordCents();
			for (let note of this.currentNotes)
				note.setChordCents(currentChordCents);
		}

		else if (state.currentSectionIndex!=this.playingSequenceIndex) {
			this.playingSequenceIndex=state.currentSectionIndex;
			this.playingSequenceChordIndex=-1;
		}
	};
}
