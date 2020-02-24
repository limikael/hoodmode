import "preact/debug";

import { h, render } from 'preact';
import App from './view/App.jsx';
import AppUiTest from './view/AppUiTest.jsx';
import AppContext from './utils/AppContext.js';
import shortid from 'shortid';
import AppHelper from './model/AppHelper.js';
import AppController from './model/AppController.js';

class MockConductor {
	setState() {
	}

	loadInstruments() {
	}
}

class UiTestAppController extends AppController {
	uiTestInit() {
		/*let state=this.initState();
		return state;*/

		return this.songSettings();
	}

	introPage2() {
		let state=this.initState();

		state=this.addSong(state,"Hello");
		state=this.addSong(state,"World");
		state.currentSongIndex=-1;

		return state;
	}

	introPage4() {
		console.log("intro page 4");

		let state=this.initState();

		state=this.addSong(state,"Song 1");
		state=this.addSong(state,"Song 2");
		state=this.addSong(state,"Song 3");
		state=this.addSong(state,"Song 4");
		state.currentSongIndex=-1;

		return state;
	}

	songSettings() {
		let state=this.initState();

		state=this.addSong(state,"Song 1");
		state.currentSongIndex=0;
		state.settingsVisible=true;

		return state;
	}

	song() {
		let state=this.initState();

		state=this.addSong(state,"Song 1");
		state.currentSongIndex=0;

		return state;
	}

	layerEditor() {
		let state=this.initState();

		state=this.addSong(state,"Song 1");
		state.currentSongIndex=0;

		state=this.addLayer(state,"Yes Drums");
		state.currentLayerIndex=0;

		state.songs[0].layers[0].seq[0][0]=true;
		state.songs[0].layers[0].seq[0][4]=true;
		state.songs[0].layers[0].seq[0][8]=true;
		state.songs[0].layers[0].seq[0][12]=true;

		state.songs[0].layers[0].seq[1][4]=true;
		state.songs[0].layers[0].seq[1][12]=true;

		state.currentGridIndex=0;

		return state;
	}
}

let mockConductor=new MockConductor();
let appHelper=new AppHelper(mockConductor);
let appController=new UiTestAppController(mockConductor,appHelper);

let appContext=(
	<AppContext
			controller={appController}
			helper={appHelper}
			initAction="layerEditor"
			logActions={true}>
		<App/>
		<AppUiTest/>
	</AppContext>
);

render(appContext, document.body);
