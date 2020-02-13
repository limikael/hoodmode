export default class AppHelper {
	constructor(model) {
		this.model=model;
	}

	getCurrentSong(state) {
		return state.songs[state.currentSongIndex];
	}

	getCurrentLayer(state) {
		return state.songs[state.currentSongIndex].layers[state.currentLayerIndex];
	}

	getCurrentInstrument(state) {
		let layer=this.getCurrentLayer(state);
		return this.model.getInstrumentByName(layer.instrumentName);
	}
}
