import MusicUtil from '../utils/MusicUtil.js';

export default class AppHelper {
	constructor(conductor) {
		this.conductor=conductor;
	}

	getCurrentSong(state) {
		return state.songs[state.currentSongIndex];
	}

	getCurrentLayer(state) {
		return state.songs[state.currentSongIndex].layers[state.currentLayerIndex];
	}

	getInstrumentByName(state, name) {
		for (let instrument of state.instruments)
			if (instrument.name==name)
				return instrument;
	}

	getInstrumentNumSoundsByName(state, name) {
		let instrument=this.getInstrumentByName(state,name);

		switch (instrument.type) {
			case "harmonic":
				return 9;

			case "percussive":
				return instrument.labels.length;
		}
	}

	getCurrentInstrument(state) {
		let layer=this.getCurrentLayer(state);
		return this.getInstrumentByName(state,layer.instrumentName);
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

	currentLayerHasSoundAt(state, gridIndex) {
		let layer=this.getCurrentLayer(state);

		for (let soundIndex=0; soundIndex<layer.seq.length; soundIndex++)
			if (layer.seq[soundIndex][gridIndex])
				return true;

		return false;
	}

	currentLayerHasChordAt(state, gridIndex, octave) {
		let layer=this.getCurrentLayer(state);

		for (let i=0; i<3; i++)
			if (!layer.seq[octave*3+i][gridIndex])
				return false;

		return true;
	}

	isSongOpen(state) {
		return (state.currentSongIndex>=0);
	}
}
