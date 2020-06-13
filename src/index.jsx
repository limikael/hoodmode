import "preact/debug";
import { h, render } from 'preact';
import App from './view/App.jsx';
import StateStore from './utils/StateStore.jsx';
import shortid from 'shortid';
import AppController from './model/AppController.js';
import AppHelper from './model/AppHelper.js';
import Conductor from './model/Conductor.js';
import StoreManager from './model/StoreManager.js';
import MockStoreManager from './model/MockStoreManager.js';
import HtmlUtil from './utils/HtmlUtil.js';

let stateStore=new StateStore();
let conductor=new Conductor(stateStore);

let storeManager;
if (window.hasOwnProperty("cordova"))
	storeManager=new StoreManager(stateStore);

else
	storeManager=new MockStoreManager(stateStore);

stateStore.addMutators(new AppController(conductor, storeManager));
stateStore.addMethods(new AppHelper(conductor, storeManager));

stateStore.onStateChange=()=>{
	conductor.updateState();
	storeManager.updateState();
	window.localStorage.setItem("hoodmode-songs",JSON.stringify(stateStore.songs));
	window.localStorage.setItem("hoodmode-premium",stateStore.premium);
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

let appContent=(
	<StateStore.Provider store={stateStore}>
		<App/>
	</StateStore.Provider>
);

function start() {
	stateStore.init();
	window.addEventListener('keyboardWillHide', () => {
		window.scrollTo(0, 0);
		HtmlUtil.setCssVar('--scroll','0');
	});
	window.addEventListener('keyboardDidShow', (event) => {
		let el=document.activeElement;
		if (el) {
			let windowHeight=document.documentElement.clientHeight;
			let rect=el.getBoundingClientRect();
			let mp=rect.top+rect.height/2;
			let fh=windowHeight-event.keyboardHeight;
			let scroll=fh/2-mp;

			HtmlUtil.setCssVar('--scroll',Math.round(scroll)+"px");
		}

		else {
			HtmlUtil.setCssVar('--scroll','0');
		}
	});
	document.addEventListener("backbutton", () => stateStore.goBack(), true);
	render(appContent, document.body);
}

if (window.hasOwnProperty("cordova"))
	document.addEventListener('deviceready',start);

else
	start();
