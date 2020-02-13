import { h, render } from 'preact';
import App from './view/App.jsx';
import AppContext from './utils/AppContext.js';
import shortid from 'shortid';
import AppController from './model/AppController.js';
import AppHelper from './model/AppHelper.js';
import AppModel from './model/AppModel.js';

let appModel=new AppModel();
let appHelper=new AppHelper(appModel);
let appController=new AppController(appModel,appHelper);
let appContext=(
	<AppContext
			controller={appController}
			helper={appHelper}
			initAction="init">
		<App/>
	</AppContext>
);

render(appContext, document.body);
