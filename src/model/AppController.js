import shortid from 'shortid';
import "regenerator-runtime/runtime";

export default class AppController {
	constructor(conductor, helper) {
		this.conductor=conductor;
		this.helper=helper;
	}

	initState() {
		let state={
			currentSongIndex: -1,
			currentLayerIndex: -1,
			currentChordIndex: 0,
			currentSectionIndex: -1,
			currentGridIndex: -1,
			settingsVisible: false,
			addLayerVisible: false,
			songs: [],
			instruments: [],
			playing: false,
			recording: false,
			editSectionChordVisible: -1
		}

		state.instruments.push({
			"key": "bad-jazz-drums",
			"type": "percussive",
			"name": "Bad Jazz Drums",
			"labels": ["KICK","SNARE","HI-HAT"],
			"icon": "drum.svg",
			"icons": ["kick-drum.svg","snare-drum.svg","hi-hat.svg"],
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
			"icon": "drum.svg",
			"icons": ["kick-drum.svg","snare-drum.svg","hi-hat.svg","hi-hat.svg","hi-hat.svg"],
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
			"sample": "samples/bass/upright-bass-bombdive.mp3",
			"icon": "bass.svg"
		});

		state.instruments.push({
			"key": "acoustic-bass",
			"type": "harmonic",
			"name": "Acoustic Bass",
			"sampleNote": "F#",
			"sample": "samples/bass/acoustic_bass_f_sharp.mp3",
			"icon": "bass.svg"
		});

		state.instruments.push({
			"key": "piano",
			"type": "harmonic",
			"name": "Piano",
			"sample": "samples/piano/piano-c.wav",
			"defaultVolume": 0.25,
			"icon": "piano.svg"
		});

		return state;
	}

	async init() {
		let state=this.initState();
		let songDataJson=window.localStorage.getItem("hoodmode-songs");
		if (songDataJson)
			state.songs=JSON.parse(songDataJson);

		this.conductor.setState(state);
		await this.conductor.loadInstruments();

		return state;
	};

	addSong(state, name) {
		if (!name || name.toString()=="[object MouseEvent]")
			name="My New Song";

		let index=state.songs.length;

		state.songs.push({
			name: name,
			bpm: 100,
			key: shortid.generate(),
			musicKey: "A",
			minor: true,
			layers: [],
			chordSequence: [],
			sections: [
				[0],
				[0],
				[0]
			]
		});

		state=this.setSongIndex(state,index);
		state=this.addSequenceChord(state);

		return state;
	}

	setCurrentChordIndex(state, index) {
		state.currentChordIndex=index;

		return state;
	}

	setCurrentSectionIndex(state, index) {
		state.currentSectionIndex=index;

		return state;
	}

	closeSong(state) {
		state.currentSongIndex=-1;
		state.currentSectionIndex=-1;

		return state;
	}

	setSongIndex(state, index) {
		if (index==state.currentSongIndex)
			return state;

		state.currentSongIndex=index;
		state.currentLayerIndex=-1;
		state.currentChordIndex=0;
		state.currentGridIndex=-1;
		state.currentSectionIndex=-1;
		state.playing=false;
		state.recording=false;

		let song=this.helper.getCurrentSong(state);
		for (let i=song.sections.length-1; i>=0; i--)
			if (song.sections[i].length>1)
				state.currentSectionIndex=i;

		return state;
	}

	showSettings(state) {
		state.settingsVisible=true;

		return state;
	}

	hideSettings(state) {
		state.settingsVisible=false;

		return state;
	}

	toggleSettings(state) {
		state.settingsVisible=!state.settingsVisible;

		return state;
	}

	setCurrentSongName(state, name) {
		state.songs[state.currentSongIndex].name=name;

		return state;
	}

	setCurrentSongBpm(state, bpm) {
		bpm=parseInt(bpm);
		if (isNaN(bpm))
			bpm=100;

		if (bpm<50)
			bpm=50;

		if (bpm>200)
			bpm=200;

		state.songs[state.currentSongIndex].bpm=bpm;

		return state;
	}

	setCurrentSongMusicKey(state, musicKey) {
		state.songs[state.currentSongIndex].musicKey=musicKey;

		return state;
	}

	setCurrentSongMinor(state, minor) {
		state.songs[state.currentSongIndex].minor=minor;

		return state;
	}

	deleteCurrentSong(state) {
		state.songs.splice(state.currentSongIndex,1);
		state.currentSongIndex=-1;
		state.settingsVisible=false;
		state.currentSectionIndex=-1;

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

		for (let i=0; i<16; i++)
			seq.push({
				sounds: [],
				vel: 1,
				stacc: false
			});

		let layer={
			key: shortid.generate(),
			instrumentName: instrumentName,
			audible: true,
			volume: volume,
			seq: seq,
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
		state.currentGridIndex=-1;
		return state;
	}

	toggleLayerAudible(state, layerIndex) {
		let song=this.helper.getCurrentSong(state);
		song.layers[layerIndex].audible=!song.layers[layerIndex].audible;

		return state;
	}

	deleteCurrentLayer(state) {
		let song=this.helper.getCurrentSong(state);
		song.layers.splice(state.currentLayerIndex,1);
		state.currentLayerIndex=-1;
		state.currentGridIndex=-1;
		state.settingsVisible=false;

		return state;
	}

	setCurrentLayerVolume(state, volume) {
		let layer=this.helper.getCurrentLayer(state);
		layer.volume=parseFloat(volume);

		return state;
	}

	playClick(state) {
		state.playing=!state.playing;
		state.currentGridIndex=-1;

		if (!state.playing)
			state.recording=false;

		return state;
	}

	recordClick(state) {
		state.recording=!state.recording;
		state.currentGridIndex=-1;

		if (state.recording && !state.playing)
			state.playing=true;

		if (!state.playing)
			state.currentGridIndex=-1;

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
		if (state.settingsVisible)
			return this.hideSettings(state);

		else if (state.currentLayerIndex>=0) {
			state.currentLayerIndex=-1;
			state.currentGridIndex=-1;
			return state;
		}

		else if (state.addLayerVisible)
			return this.hideAddLayer(state);

		else if (this.helper.isSongOpen(state))
			return this.closeSong(state)

		return state;
	}

	gridIndexClick(state, newGridIndex) {
		state.playing=false;
		state.recording=false;

		if (state.currentGridIndex==newGridIndex)
			state.currentGridIndex=-1;

		else
			state.currentGridIndex=newGridIndex;

		return state;
	}

	toggleCurrentLayerStacc(state) {
		let layer=this.helper.getCurrentLayer(state);
		let gridIndex=state.currentGridIndex;

		if (state.recording)
			gridIndex=this.conductor.getPlayGridIndex();

		if (gridIndex<0)
			return state;

		layer.seq[gridIndex].stacc=!layer.seq[gridIndex].stacc;

		return state;
	}

	setCurrentLayerVel(state, vel) {
		let layer=this.helper.getCurrentLayer(state);
		let gridIndex=state.currentGridIndex;

		if (state.recording)
			gridIndex=this.conductor.getPlayGridIndex();

		if (gridIndex<0)
			return state;

		layer.seq[gridIndex].vel=vel;

		return state;
	}

	setCurrentGridSound(state, soundIndex, enabled) {
		let layer=this.helper.getCurrentLayer(state);
		let currentEnabled=
			layer.seq[state.currentGridIndex].sounds.includes(soundIndex);

		if (enabled==currentEnabled)
			return state;

		if (enabled)
			layer.seq[state.currentGridIndex].sounds.push(soundIndex);

		else
			layer.seq[state.currentGridIndex].sounds.splice(
				layer.seq[state.currentGridIndex].sounds.indexOf(soundIndex),
				1
			);

		return state;
	}

	soundButtonClick(state, soundIndex) {
		if (state.recording) {
			this.conductor.playLayerInstrument(soundIndex);

			let gridIndex=this.conductor.getPlayGridIndex();
			let layer=this.helper.getCurrentLayer(state);

			if (!layer.seq[gridIndex].sounds.includes(soundIndex))
				layer.seq[gridIndex].sounds.push(soundIndex);

			return state;
		}

		if (state.currentGridIndex<0) {
			this.conductor.playLayerInstrument(soundIndex);
			return state;
		}

		let layer=this.helper.getCurrentLayer(state);
		let enabled=layer.seq[state.currentGridIndex].sounds.includes(soundIndex);
		state=this.setCurrentGridSound(state,soundIndex,!enabled);

		if (layer.seq[state.currentGridIndex].sounds.includes(soundIndex))
			this.conductor.playLayerInstrument(soundIndex);

		return state;
	}

	chordButtonClick(state, octave) {
		let instrument=this.helper.getCurrentInstrument(state);

		if (state.recording) {
			this.conductor.playLayerInstrument(octave*3);
			this.conductor.playLayerInstrument(octave*3+1);
			this.conductor.playLayerInstrument(octave*3+2);

			let gridIndex=this.conductor.getPlayGridIndex();
			let layer=this.helper.getCurrentLayer(state);

			if (!layer.seq[gridIndex].sounds.includes(octave*3))
				layer.seq[gridIndex].sounds.push(octave*3);

			if (!layer.seq[gridIndex].sounds.includes(octave*3+1))
				layer.seq[gridIndex].sounds.push(octave*3+1);

			if (!layer.seq[gridIndex].sounds.includes(octave*3+2))
				layer.seq[gridIndex].sounds.push(octave*3+2);

			return state;
		}

		if (state.currentGridIndex<0) {
			this.conductor.playLayerInstrument(octave*3);
			this.conductor.playLayerInstrument(octave*3+1);
			this.conductor.playLayerInstrument(octave*3+2);
			return state;
		}

		let layer=this.helper.getCurrentLayer(state);
		if (this.helper.currentLayerHasChordAt(state,state.currentGridIndex,octave)) {
			state=this.setCurrentGridSound(state,octave*3,false);
			state=this.setCurrentGridSound(state,octave*3+1,false);
			state=this.setCurrentGridSound(state,octave*3+2,false);
		}

		else {
			state=this.setCurrentGridSound(state,octave*3,true);
			state=this.setCurrentGridSound(state,octave*3+1,true);
			state=this.setCurrentGridSound(state,octave*3+2,true);
			this.conductor.playLayerInstrument(octave*3);
			this.conductor.playLayerInstrument(octave*3+1);
			this.conductor.playLayerInstrument(octave*3+2);
		}

		return state;
	}

	addSectionChord(state) {
		let song=this.helper.getCurrentSong(state);
		song.sections[state.currentSectionIndex].push(0);

		return state;
	}

	showEditSectionChord(state,index) {
		state.editSectionChordVisible=index;
		return state;
	}

	hideEditSectionChord(state,index) {
		state.editSectionChordVisible=-1;
		return state;
	}

	removeSectionChord(state) {
		let song=this.helper.getCurrentSong(state);
		song.sections[state.currentSectionIndex].splice(state.editSectionChordVisible,1);

		state.editSectionChordVisible=-1;
		return state;
	}

	editSectionChord(state, index) {
		let song=this.helper.getCurrentSong(state);
		song.sections[state.currentSectionIndex][state.editSectionChordVisible]=index;
		state.editSectionChordVisible=-1;
		return state;
	}
}
