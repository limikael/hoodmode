import "preact/debug";

import { h, render } from 'preact';
import App from './view/App.jsx';
import AppContext from './utils/AppContext.js';
import shortid from 'shortid';
import AppController from './model/AppController.js';
import AppHelper from './model/AppHelper.js';
import Conductor from './model/Conductor.js';

let conductor, appHelper, appController;

try {
	conductor=new Conductor();
	appHelper=new AppHelper(conductor);
	appController=new AppController(conductor,appHelper);
}

catch (e) {
	alert(e);
}

conductor.onPlayGridIndexChange=(gridIndex, sequenceIndex)=>{
	for (let el of document.querySelectorAll(".current-beat"))
		el.classList.remove('current-beat');

	if (gridIndex>=0)
		for (let el of document.querySelectorAll(".beat-"+gridIndex))
			el.classList.add('current-beat');

	for (let el of document.querySelectorAll(".current-sequence"))
		el.classList.remove('current-sequence');

	if (gridIndex%4==0 && sequenceIndex>=0)
		for (let el of document.querySelectorAll(".sequence-"+sequenceIndex))
			el.classList.add('current-sequence');
}

function onStateChange(state) {
	conductor.setState(state);
	window.localStorage.setItem("hoodmode-songs",JSON.stringify(state.songs));
}

let appContext=(
	<AppContext
			controller={appController}
			helper={appHelper}
			initAction="init"
			onStateChange={onStateChange}>
		<App/>
	</AppContext>
);

function start() {
	render(appContext, document.body);
}

if (window.hasOwnProperty("cordova"))
	document.addEventListener('deviceready',start);

else
	start();
