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
				return 6;

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

	playCurrentInstrument(state, soundIndex) {
		let instrument=this.getCurrentInstrument(state);
		this.conductor.playInstrument(instrument.name,soundIndex);
	}

	getChordLabels(state) {
		let song=this.getCurrentSong(state);
		return MusicUtil.getChordNamesForScale(song.musicKey,song.minor);
	}

	getNotesSelectOptions(state) {
		let a=[];

		for (let noteName of MusicUtil.NOTE_NAMES)
			a.push({
				key: noteName, label: noteName
			});

		return a;
	}

	getModalSelectOptions(state) {
		return [
			{key: false, label: "major"},
			{key: true, label: "minor"},
		];
	}

	currentLayerHasSoundAt(state,gridIndex) {
		let layer=this.getCurrentLayer(state);

		for (let soundIndex=0; soundIndex<layer.seq.length; soundIndex++)
			if (layer.seq[soundIndex][gridIndex])
				return true;

		return false;
	}
}
