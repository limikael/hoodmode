import "preact/debug";

import { h, render } from 'preact';
import App from './view/App.jsx';
import AppContext from './utils/AppContext.js';
import shortid from 'shortid';
import AppController from './model/AppController.js';
import AppHelper from './model/AppHelper.js';
import Conductor from './model/Conductor.js';

let conductor=new Conductor();
let appHelper=new AppHelper(conductor);
let appController=new AppController(conductor,appHelper);
let appContext=(
	<AppContext
			controller={appController}
			helper={appHelper}
			initAction="init"
			onStateChange={conductor.setState}>
		<App/>
	</AppContext>
);

render(appContext, document.body);
