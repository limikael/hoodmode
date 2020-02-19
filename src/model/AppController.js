import shortid from 'shortid';
import "regenerator-runtime/runtime";

export default class AppController {
	constructor(conductor, helper) {
		this.conductor=conductor;
		this.helper=helper;
	}

	initState() {
		let state={
			currentSongIndex: 0,
			currentLayerIndex: -1,
			currentChordIndex: 0,
			songSettingsVisible: false,
			addLayerVisible: false,
			songs: [],
			instruments: [],
			playing: false,
			playingSequence: false
		}

		state.instruments.push({
			"key": "bad-jazz-drums",
			"type": "percussive",
			"name": "Bad Jazz Drums",
			"labels": ["KICK","SNARE","HI-HAT"],
			"samples": [
				"samples/drums/bad-kick.wav",
				"samples/drums/bad-snare.wav",
				"samples/drums/bad-hihat.wav",
			]
		});

		state.instruments.push({
			"key": "yes-drums",
			"type": "percussive",
			"name": "Yes Drums",
			"labels": ["KICK","SNARE","HI-HAT 1","HI-HAT 2","HI-HAT 3"],
			"samples": [
				"samples/drums/yes-kick.mp3",
				"samples/drums/yes-snare.mp3",
				"samples/drums/thrl-hat_A_minor.wav",
				"samples/drums/vinyl-hat_90bpm_C.wav",
				"samples/drums/rock-hihat-tchik.wav"
			]
		});

		state.instruments.push({
			"key": "dive-bass",
			"type": "harmonic",
			"name": "Dive Bass",
			"sample": "samples/bass/upright-bass-bombdive.mp3"
		});

		state.instruments.push({
			"key": "acoustic-bass",
			"type": "harmonic",
			"name": "Acoustic Bass",
			"sampleNote": "F#",
			"sample": "samples/bass/acoustic_bass_f_sharp.mp3"
		});

		state.instruments.push({
			"key": "piano",
			"type": "harmonic",
			"name": "Piano",
			"sample": "samples/piano/piano-c.wav",
			"defaultVolume": 0.25
		});

		return state;
	}

	async init() {
		let state=this.initState();
		let songDataJson=window.localStorage.getItem("hoodmode-songs");
		if (songDataJson)
			state.songs=JSON.parse(songDataJson);

		else 
			state=this.addSong(state);

		this.conductor.setState(state);
		await this.conductor.loadInstruments();

		return state;
	};

	addSong(state, name) {
		if (!name)
			name="My New Song";

		let index=state.songs.length;

		state.songs.push({
			name: name,
			bpm: 100,
			key: shortid.generate(),
			musicKey: "A",
			minor: true,
			layers: [],
			chordSequence: []
		});

		state=this.setSongIndex(state,index);
		state=this.addSequenceChord(state);

		return state;
	}

	setCurrentChordIndex(state, index) {
		state.currentChordIndex=index;

		return state;
	}

	closeSong(state) {
		state.currentSongIndex=-1;

		return state;
	}

	setSongIndex(state, index) {
		if (index==state.currentSongIndex)
			return state;

		state.currentSongIndex=index;
		state.currentLayerIndex=-1;
		state.currentChordIndex=0;
		state.playing=false;

		return state;
	}

	showSongSettings(state) {
		state.songSettingsVisible=true;

		return state;
	}

	hideSongSettings(state) {
		state.songSettingsVisible=false;

		return state;
	}

	toggleSongSettings(state) {
		state.songSettingsVisible=!state.songSettingsVisible;

		return state;
	}

	setCurrentSongName(state, name) {
		state.songs[state.currentSongIndex].name=name;

		return state;
	}

	setCurrentSongBpm(state, bpm) {
		state.songs[state.currentSongIndex].bpm=bpm;

		return state;
	}

	setCurrentSongMusicKey(state, musicKey) {
		state.songs[state.currentSongIndex].musicKey=musicKey;

		return state;
	}

	setCurrentSongMinor(state, minor) {
		console.log("setting minor: "+minor);

		state.songs[state.currentSongIndex].minor=minor;

		return state;
	}

	deleteCurrentSong(state) {
		state.songs.splice(state.currentSongIndex,1);

		if (!state.songs.length)
			state=this.addSong(state);

		if (state.currentSongIndex<0)
			state.currentSongIndex=0;

		if (state.currentSongIndex>=state.songs.length)
			state.currentSongIndex=state.songs.length-1;

		return state;
	}

	showAddLayer(state) {
		state.addLayerVisible=true;

		return state;
	}

	hideAddLayer(state) {
		state.addLayerVisible=false;

		return state;
	}

	addSequenceChord(state) {
		let song=this.helper.getCurrentSong(state);

		song.chordSequence.push({
			chordIndex: 0,
			key: shortid.generate()
		});

		return state;
	}

	addLayer(state, instrumentName) {
		let song=state.songs[state.currentSongIndex];

		let seq=[];
		let numSounds=this.helper.getInstrumentNumSoundsByName(state,instrumentName);
		let instrument=this.helper.getInstrumentByName(state,instrumentName);

		let volume=1;
		if (instrument.hasOwnProperty("defaultVolume"))
			volume=instrument.defaultVolume;

		for (let i=0; i<numSounds; i++)
			seq.push(Array(16).fill(false));

		let layer={
			key: shortid.generate(),
			instrumentName: instrumentName,
			audible: true,
			volume: volume,
			seq: seq,
			vel: Array(16).fill(1),
			stacc: Array(16).fill(false)
		};

		song.layers.push(layer);

		state.addLayerVisible=false;

		return state;
	}

	setLayerIndex(state, index) {
		state.currentLayerIndex=index;
		return state;
	}

	hideCurrentLayer(state) {
		state.currentLayerIndex=-1;
		return state;
	}

	toggleLayerAudible(state, layerIndex) {
		let song=this.helper.getCurrentSong(state);
		song.layers[layerIndex].audible=!song.layers[layerIndex].audible;

		return state;
	}

	toggleCurrentLayerSeq(state, sound, pos) {
		let layer=this.helper.getCurrentLayer(state);
		layer.seq[sound][pos]=!layer.seq[sound][pos];

		return state;
	}

	toggleCurrentLayerStacc(state, pos) {
		let layer=this.helper.getCurrentLayer(state);
		layer.stacc[pos]=!layer.stacc[pos];

		return state;
	}

	toggleCurrentLayerVel(state, pos) {
		let layer=this.helper.getCurrentLayer(state);
		let n;

		switch (layer.vel[pos]) {
			case 1:
				n=.25;
				break;

			case .25:
				n=.5;
				break;

			case .5:
				n=1;
				break;
		}

		layer.vel[pos]=n;

		return state;
	}

	deleteCurrentLayer(state) {
		let song=this.helper.getCurrentSong(state);
		song.layers.splice(state.currentLayerIndex,1);
		state.currentLayerIndex=-1;

		return state;
	}

	setCurrentLayerVolume(state, volume) {
		let layer=this.helper.getCurrentLayer(state);
		layer.volume=volume;

		return state;
	}

	togglePlaying(state) {
		state.playing=!state.playing;

		return state;
	}

	setPlayingSequence(state, playingSequence) {
		state.playingSequence=playingSequence;

		return state;
	}

	deleteSequenceChord(state, index) {
		let song=this.helper.getCurrentSong(state);
		song.chordSequence.splice(index,1);

		return state;
	}

	setSequenceChord(state, sequenceIndex, chordIndex) {
		let song=this.helper.getCurrentSong(state);
		song.chordSequence[sequenceIndex].chordIndex=chordIndex;

		return state;
	}

	goBack(state) {
		if (state.songSettingsVisible)
			return this.hideSongSettings(state);

		else if (this.helper.isSongOpen(state))
			return this.closeSong(state)

		return state;
	}
}
