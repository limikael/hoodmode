import shortid from 'shortid';
import "regenerator-runtime/runtime";
import demosongs from './demosongs';

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
			editSectionChordVisible: -1,
			menuVisible: false,
		};

		state.instruments.push({
			"key": "basic-drums",
			"type": "percussive",
			"name": "Drums",
			"labels": [
				"KICK","KICK","SNARE",
				"SNARE","HI-HAT","HI-HAT",
				"HI-HAT","SHAKER","CLAP"],
			"icon": "drum.svg",
			"icons": [
				"kick-drum.svg","kick-drum.svg",
				"snare-drum.svg","snare-drum.svg",
				"hi-hat.svg","hi-hat.svg","hi-hat.svg",
				"maracas.svg","clap.svg"],
			"samples": [
				"samples/drums/yes-kick.mp3",
				"samples/drums/bad-kick.wav",
				"samples/drums/yes-snare.mp3",
				"samples/drums/bad-snare.wav",
				"samples/drums/bad-hihat.wav",
				"samples/drums/thrl-hat_A_minor.wav",
				"samples/drums/rock-hihat-tchik.wav",
				"samples/drums/Yamaha-RX15-Shaker.wav",
				"samples/drums/Roland-R-8-808-Clap.wav"
			]
		});

		state.instruments.push({
			"key": "basic-bass",
			"type": "harmonic",
			"name": "Bass",
			"sample": "samples/Yamaha-EX5-Old-Strings-C2-edited.wav",
			"icon": "bass.svg"
		});

		state.instruments.push({
			"key": "basic-piano",
			"type": "harmonic",
			"name": "Piano",
			"sample": "samples/piano-c.wav",
			"icon": "piano.svg",
			"defaultVolume": 0.25
		});

		state.instruments.push({
			"key": "basic-organ",
			"type": "harmonic",
			"name": "Organ",
			"sample": "samples/Korg-DW-8000-Organ-C3.wav",
			"icon": "organ.svg",
			"defaultVolume": 0.25
		});

		state.instruments.push({
			"key": "basic-clav",
			"type": "harmonic",
			"name": "Clav",
			"sample": "samples/Ensoniq-ESQ-1-Clav-Piano-C3.wav",
			"icon": "clav.svg",
			"defaultVolume": 0.75
		});

		state.instruments.push({
			"key": "basic-strings",
			"type": "harmonic",
			"name": "Strings",
			"sample": "samples/Yamaha-EX5-MellowStrngs-C4.wav",
			"icon": "violin.svg",
			"defaultVolume": 0.25
		})

		return state;
	}

	async init() {
		let state=this.initState();
		let songDataJson=window.localStorage.getItem("hoodmode-songs");
		if (songDataJson)
			state.songs=JSON.parse(songDataJson);

		if (!state.songs || !state.songs.length)
			state.songs=demosongs;

		state.premium=window.localStorage.getItem("hoodmode-premium");

		this.conductor.setState(state);
		await this.conductor.loadInstruments();

		if (navigator.splashscreen) {
			navigator.splashscreen.hide();
		}

		return state;
	};

	addSong(state, name) {
		if (!name || name.toString()=="[object MouseEvent]")
			name="My New Song";

		if (state.premium!="jamming" && state.songs.length>=3) {
			state.dialog={
				text: 
					"Go pro and create an unlimited number of songs!",

				buttons: [{
					bg: "danger",
					text: "Pro",
					action: "goPro"
				},{
					bg: "info",
					text: "Later"
				}]
			}

			state.dialogText="Max 3 songs during beta...";

			return state;
		}

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
		state.currentSectionIndex=0;
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

	showAboutScreen(state) {
		state.dialog={
			text: 
				"Qord\n\n"+
				"Version: "+this.helper.getAppVersion()+"\n\n"+
				"Enjoy! Please let me know of any bugs you find!",

			buttons: [{
				bg: "danger",
				text: "Pro",
				action: "goPro"
			},{
				bg: "info",
				text: "Ok"
			}]
		}

		return state;
	}

	toggleMenu(state) {
		state.menuVisible=!state.menuVisible;

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

	confirmDeleteCurrentSong(state) {
		state.dialog=null;

		state.songs.splice(state.currentSongIndex,1);
		state.currentSongIndex=-1;
		state.settingsVisible=false;
		state.currentSectionIndex=0;

		return state;
	}

	deleteCurrentSong(state) {
		let name=this.helper.getCurrentSong(state).name;

		state.dialog={
			text:
				"Sure you want to delete the current song\n\n"+
				"'"+name+"',\n\n"+
				"It might be a hit one day!?",

			buttons: [{
				bg: "info",
				text: "Cancel"
			},{
				bg: "warning",
				text: "Ok",
				action: "confirmDeleteCurrentSong"
			}]
		};

		return state;
	}

	goPro(state) {
		state.dialog={
			text:
				"Please enter the password to unlock the pro features!",

			input: "",
			buttons: [{
				bg: 'danger',
				text: 'Pro',
				action: 'confirmGoPro'
			},{
				bg: 'info',
				text: 'Later'
			}]
		};

		return state;
	}

	confirmGoPro(state) {
		state.premium=state.dialog.input;

		if (state.premium=="jamming") {
			state.dialog={
				text:
					"Pro features unlocked!",

				buttons: [{
					bg: 'info',
					text: 'Ok'
				}]
			};
		}

		else {
			state.dialog={
				text:
					"Sorry that's the wrong password...",

				buttons: [{
					bg: 'info',
					text: 'Ok'
				}]
			};
		}

		return state;
	}

	setDialogInput(state,value) {
		state.dialog.input=String(value).toLowerCase();
		return state;
	}

	cancelDialog(state) {
		state.dialog=null;

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

	addLayer(state, instrumentKey) {
		let song=state.songs[state.currentSongIndex];

		let seq=[];
		let numSounds=this.helper.getInstrumentNumSoundsByKey(state,instrumentKey);
		let instrument=this.helper.getInstrumentByKey(state,instrumentKey);

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
			instrumentKey: instrumentKey,
			audible: true,
			volume: volume,
			seq: seq,
		};

		let layerIndex=song.layers.length;
		song.layers.push(layer);

		state.addLayerVisible=false;
		state.currentLayerIndex=layerIndex;

		return state;
	}

	setLayerIndex(state, index) {
		let song=this.helper.getCurrentSong(state);

		if (!this.helper.instrumentExists(state,song.layers[index].instrumentKey)) {
			state.dialogText="Layer is broken, delete?";
			state.dialogAction="deleteDialogLayer";
			state.dialogData=index;

			return state;
		}

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

	deleteDialogLayer(state) {
		let song=this.helper.getCurrentSong(state);
		song.layers.splice(state.dialogData,1);
		state.currentLayerIndex=-1;
		state.currentGridIndex=-1;
		state.settingsVisible=false;

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
			if (!this.helper.currentLayerHasAnySound(state))
				state=this.deleteCurrentLayer(state);

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
		if (layer.seq[gridIndex].stacc)
			layer.seq[gridIndex].sounds=[];

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

	setGridSound(state, gridIndex, soundIndex, enabled) {
		let layer=this.helper.getCurrentLayer(state);
		let currentEnabled=
			layer.seq[gridIndex].sounds.includes(soundIndex);

		if (enabled==currentEnabled)
			return state;

		if (enabled) {
			layer.seq[gridIndex].sounds.push(soundIndex);
			layer.seq[gridIndex].stacc=false;
		}

		else {
			layer.seq[gridIndex].sounds.splice(
				layer.seq[gridIndex].sounds.indexOf(soundIndex),
				1
			);
		}

		return state;
	}

	setCurrentGridSound(state, soundIndex, enabled) {
		return this.setGridSound(state,state.currentGridIndex,soundIndex,enabled);
	}

	soundButtonClick(state, soundIndex) {
		if (state.recording) {
			this.conductor.playLayerInstrument(soundIndex);

			let gridIndex=this.conductor.getPlayGridIndex();
			state=this.setGridSound(state,gridIndex,soundIndex,true);

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
			state=this.setGridSound(state,gridIndex,octave*3,true);
			state=this.setGridSound(state,gridIndex,octave*3+1,true);
			state=this.setGridSound(state,gridIndex,octave*3+2,true);

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
