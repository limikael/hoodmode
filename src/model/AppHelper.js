import MusicUtil from '../utils/MusicUtil.js';
const appPackage=require("../../package.json");

export default class AppHelper {
	constructor(conductor) {
		this.conductor=conductor;
	}

	getAppVersion() {
		return appPackage.version;
	}

	getCurrentSong(state) {
		return state.songs[state.currentSongIndex];
	}

	getSongKeyLabelByIndex(state, songIndex) {
		let songData=state.songs[songIndex];

		return songData.musicKey+(songData.minor?"m":"");
	}

	getCurrentLayer(state) {
		return state.songs[state.currentSongIndex].layers[state.currentLayerIndex];
	}

	instrumentExists(state, key) {
		for (let instrument of state.instruments)
			if (instrument.key==key)
				return true;

		return false;
	}

	getInstrumentByKey(state, key) {
		for (let instrument of state.instruments)
			if (instrument.key==key)
				return instrument;
	}

	getInstrumentIconByKey(state, key) {
		let instrument=this.getInstrumentByKey(state,key);

		if (!instrument)
			return "broken.svg";

		return instrument.icon;
	}

	getInstrumentNumSoundsByKey(state, key) {
		let instrument=this.getInstrumentByKey(state,key);

		switch (instrument.type) {
			case "harmonic":
				return 9;

			case "percussive":
				return instrument.labels.length;
		}
	}

	getCurrentInstrument(state) {
		let layer=this.getCurrentLayer(state);
		return this.getInstrumentByKey(state,layer.instrumentKey);
	}

	getCurrentInstrumentSoundLabels(state) {
		let instrument=this.getCurrentInstrument(state);

		switch (instrument.type) {
			case "harmonic":
				return ["T1","T2","T3","O-T1","O-T2","O-T3"];

			case "percussive":
				return instrument.labels;
		}
	}

	getChordLabels(state) {
		let song=this.getCurrentSong(state);
		return MusicUtil.getChordNamesForScale(song.musicKey,song.minor);
	}

	getCurrentSectionChordLabels(state) {
		let song=this.getCurrentSong(state);
		let chordNames=MusicUtil.getChordNamesForScale(song.musicKey,song.minor);
		let section=song.sections[state.currentSectionIndex];
		let a=[];

		for (let i of section)
			a.push(chordNames[i]);

		return a;
	}

	getNotesSelectOptions(state) {
		let a=[];

		for (let noteName of MusicUtil.NOTE_NAMES)
			a.push({
				key: noteName, label: noteName
			});

		return a;
	}

	getChordOptions(state) {
		let song=this.getCurrentSong(state);
		let chordNames=MusicUtil.getChordNamesForScale(song.musicKey,song.minor);
		let a=[];

		for (let chordName of chordNames)
			a.push({
				key: chordName,
				label: chordName
			});

		return a;
	}

	getModalSelectOptions(state) {
		return [
			{key: false, label: "major"},
			{key: true, label: "minor"},
		];
	}

	currentLayerHasAnySound(state) {
		let layer=this.getCurrentLayer(state);

		for (let i=0; i<16; i++)
			if (layer.seq[i].sounds.length>0)
				return true;

		return false;
	}

	currentLayerHasSoundAt(state, gridIndex) {
		let layer=this.getCurrentLayer(state);

		if (layer.seq[gridIndex].sounds.length>0)
			return true;

		return false;
	}

	currentLayerHasChordAt(state, gridIndex, octave) {
		let layer=this.getCurrentLayer(state);

		for (let i=0; i<3; i++)
			if (!layer.seq[gridIndex].sounds.includes(octave*3+i))
				return false;

		return true;
	}

	isSongOpen(state) {
		return (state.currentSongIndex>=0);
	}

	isLayerOpen(state) {
		return (this.isSongOpen(state) && (state.currentLayerIndex>=0));
	}
}
