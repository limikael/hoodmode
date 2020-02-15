import shortid from 'shortid';
import "regenerator-runtime/runtime";

export default class AppController {
	constructor(conductor, helper) {
		this.conductor=conductor;
		this.helper=helper;
	}

	async init() {
		let state={
			currentSongIndex: 0,
			currentLayerIndex: -1,
			songSettingsVisible: false,
			addLayerVisible: false,
			songs: [],
			instruments: []
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

		state=this.addNewSong(state,"Hello");
		state=this.addNewSong(state,"World");

		this.conductor.setState(state);
		await this.conductor.loadInstruments();

		return state;
	};

	addNewSong(state, name) {
		if (!name)
			name="My New Song";

		let index=state.songs.length;

		state.songs.push({
			name: name,
			bpm: 100,
			key: shortid.generate(),
			layers: []
		});

		return this.setSongIndex(state,index);
	}

	setSongIndex(state, index) {
		state.currentSongIndex=index;

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

	setCurrentSongName(state, name) {
		state.songs[state.currentSongIndex].name=name;

		return state;
	}

	setCurrentSongBpm(state, bpm) {
		state.songs[state.currentSongIndex].bpm=bpm;

		return state;
	}

	deleteCurrentSong(state) {
		state.songs.splice(state.currentSongIndex,1);

		if (!state.songs.length)
			state=AppController.addNewSong(state);

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

	addLayer(state, instrumentName) {
		let song=state.songs[state.currentSongIndex];

		let seq=[];
		let numSounds=this.helper.getInstrumentNumSoundsByName(state,instrumentName);
		for (let i=0; i<numSounds; i++)
			seq.push(Array(16).fill(false));

		let layer={
			key: shortid.generate(),
			instrumentName: instrumentName,
			audible: true,
			volume: 1,
			seq: seq,
			vel: Array(16).fill(1),
			stacc: Array(16).fill(false)
		};

		song.layers.push(layer);

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
}
