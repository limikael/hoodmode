import HarmonicInstrument from './HarmonicInstrument';
import PercussiveInstrument from './PercussiveInstrument';
import AudioUtil from '../utils/AudioUtil';
import SongModel from './SongModel';

export default class AppModel {
	constructor() {
		this.audioContext=new window.AudioContext();
		if (!this.audioContext)
			throw new Error("no web audio!");

		this.instruments=[];
		this.songs=[];
		this.currentChordIndex=0;
		this.chordSequenceIndex=-1;

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
			"sample": "samples/piano/piano-c.wav"
		}));

		this.currentNotes=[];
		this.loadFromLocalStorage();

		if (!this.songs.length)
			this.addNewSong();

		this.setCurrentSongIndex(0);
	}

	addSong(song) {
		song.setApp(this);
		this.songs.push(song);
	}

	setCurrentSongIndex(index) {
		this.currentSongIndex=index;
	}

	getCurrentSong() {
		return this.songs[this.currentSongIndex];
	}

	getSongNames() {
		let names=this.songs.map((song)=>{return song.name});
		return names;
	}

	addSequenceChord() {
		let song=this.getCurrentSong();
		song.chordSequence.push(0);
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

	isPlaying() {
		return !!this.playTimer;
	}

	stop() {
		clearTimeout(this.playTimer);
		this.playTimer=null;

		for (let note of this.currentNotes)
			note.setVelocity(0);

		this.currentNotes=[];

		if (this.chordSequenceIndex>=0)
			this.chordSequenceIndex=0;
	}

	play=()=>{
		let song=this.getCurrentSong();

		if (this.chordSequenceIndex>=0) {
			if (this.chordSequenceIndex>=song.chordSequence.length)
				this.chordSequenceIndex=0;

			this.setCurrentChordIndex(song.chordSequence[this.chordSequenceIndex]);
			this.chordSequenceIndex++;

			if (this.chordSequenceIndex>=song.chordSequence.length)
				this.chordSequenceIndex=0;
		}
		this.playStartTime=this.audioContext.currentTime;

		for (let layer of song.layers)
			layer.play(this.playStartTime);

		this.playTimer=setTimeout(this.play,4*1000*60/song.bpm);
	}

	onInstrumentNoteEnded(note) {
		let idx=this.currentNotes.indexOf(note);
		if (idx<0)
			return;

		this.currentNotes.splice(idx,1);
	}

	addInstrumentNote(note) {
		note.onended=this.onInstrumentNoteEnded.bind(this,note);
		this.currentNotes.push(note);
	}

	getChordLabels() {
		let song=this.getCurrentSong();
		return AudioUtil.getChordNamesForScale(song.key,song.minor);
	}

	getCurrentChordNoteCents(triadNote) {
		let song=this.getCurrentSong();
		let scaleChordNotes=AudioUtil.getChordNotesForScale(song.key,song.minor);
		let chordNotes=scaleChordNotes[this.currentChordIndex];
		return AudioUtil.noteToCents(chordNotes[triadNote]);
	}

	getCurrentChordCents() {
		let song=this.getCurrentSong();
		let scaleChordNotes=AudioUtil.getChordNotesForScale(song.key,song.minor);
		let chordNotes=scaleChordNotes[this.currentChordIndex];
		return [
			AudioUtil.noteToCents(chordNotes[0]),
			AudioUtil.noteToCents(chordNotes[1]),
			AudioUtil.noteToCents(chordNotes[2])
		];
	}

	setCurrentChordIndex(chordIndex) {
		this.currentChordIndex=chordIndex;
		let chordCents=this.getCurrentChordCents();

		for (let note of this.currentNotes)
			note.setChordCents(chordCents);
	}

	addNewSong() {
		this.addSong(new SongModel("My New Song"));
		this.setCurrentSongIndex(this.songs.length-1);
	}

	deleteCurrentSong() {
		this.songs.splice(this.currentSongIndex,1);

		if (!this.songs.length)
			this.addNewSong();

		if (this.currentSongIndex>=this.songs.length)
			this.currentSongIndex=this.songs.length-1;
	}

	loadFromLocalStorage() {
		let jsonData=window.localStorage.getItem("songs");
		if (!jsonData || !jsonData.length)
			return;

		let datas=JSON.parse(jsonData);
		console.log("Loading songs: "+datas.length);

		for (let data of datas) {
			this.addNewSong();
			this.getCurrentSong().applyObjectData(data);
		}
	}

	saveToLocalStorage() {
		let songData=[];
		for (let song of this.songs)
			songData.push(song.getObjectData());

		window.localStorage.setItem("songs",JSON.stringify(songData));
	}

	getInstrumentByName(name) {
		for (let instrument of this.instruments)
			if (instrument.name==name)
				return instrument;
	}
}
