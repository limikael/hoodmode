import shortid from 'shortid';

export default class AppController {
	constructor(model, helper) {
		this.model=model;
		this.helper=helper;
	}

	init() {
		let state={
			currentSongIndex: 0,
			currentLayerIndex: -1,
			songSettingsVisible: false,
			addLayerVisible: false,
			songs: [],
			instruments: []
		}

		for (let instrument of this.model.instruments) {
			state.instruments.push({
				id: shortid.generate(),
				name: instrument.name
			});
		}

		state=this.addNewSong(state,"Hello");
		state=this.addNewSong(state,"World");

		return state;
	};

	addNewSong(state, name) {
		if (!name)
			name="My New Song";

		let index=state.songs.length;

		state.songs.push({
			name: name,
			bpm: 100,
			id: shortid.generate(),
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
		let instrument=this.model.getInstrumentByName(instrumentName);

		let seq=[];
		for (let i=0; i<instrument.getNumSounds(); i++)
			seq.push(Array(16).fill(false));

		let layer={
			id: shortid.generate(),
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
