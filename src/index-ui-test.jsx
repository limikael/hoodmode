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

		return this.introPage2();
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
}

let mockConductor=new MockConductor();
let appHelper=new AppHelper(mockConductor);
let appController=new UiTestAppController(mockConductor,appHelper);

let appContext=(
	<AppContext
			controller={appController}
			helper={appHelper}
			initAction="uiTestInit"
			logActions={true}>
		<App/>
		<AppUiTest/>
	</AppContext>
);

render(appContext, document.body);
