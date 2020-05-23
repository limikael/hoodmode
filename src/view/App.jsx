import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import { Select, IF } from '../utils/ReactUtil.jsx';
import Header from './Header.jsx';
import Front from './Front.jsx';
import Song from './Song.jsx';
import SongSettings from './SongSettings.jsx';
import LayerSettings from './LayerSettings.jsx';
import AddLayer from './AddLayer.jsx';
import Layer from './Layer.jsx';
import SelectChord from './SelectChord.jsx';
import TapHighlight from './TapHighlight.jsx';
import AboutScreen from './AboutScreen.jsx';
import Dialog from './Dialog.jsx';
import A from './A.jsx';

export default class App extends Component {
	updateSize=()=>{
		let windowWidth=document.documentElement.clientWidth;
		let windowHeight=document.documentElement.clientHeight;

		let cs=getComputedStyle(document.documentElement);
		let paneWidth=parseFloat(cs.getPropertyValue('--paneWidth'));
		let paneHeight=parseFloat(cs.getPropertyValue('--paneHeight'));

		let contentWidth,contentHeight;

		let el=document.activeElement;
		let screenKeyboardActive=false;
		if (el.nodeName=="INPUT" && el.type=="text")
			screenKeyboardActive=true;

		// Portrait.
		if (windowHeight>windowWidth) {
			contentHeight=2*(paneHeight+1)+2;
			contentWidth=paneWidth+1;
			document.querySelector("body").classList.add("portrait");
			document.querySelector("body").classList.remove("landscape");

			if (window.hasOwnProperty("cordova"))
				StatusBar.show();
		}

		// Landscape.
		else {
			contentHeight=paneHeight+2+1;
			contentWidth=2*(paneWidth+1);
			document.querySelector("body").classList.add("landscape");
			document.querySelector("body").classList.remove("portrait");

			if (window.hasOwnProperty("cordova")) {
				if (screenKeyboardActive)
					StatusBar.show();

				else
					StatusBar.hide();
			}
		}

		let fontSize;
		if (windowWidth/contentWidth<windowHeight/contentHeight)
			fontSize=windowWidth/contentWidth;

		else
			fontSize=windowHeight/contentHeight;

		document.querySelector("html").style.fontSize=fontSize+"px";

		let s=document.documentElement.style;
		s.setProperty("--paneMarginTop",((windowHeight-fontSize*contentHeight)/2)+"px");
		s.setProperty("--paneMarginLeft",((windowWidth-fontSize*contentWidth)/2)+"px");
	}

	componentDidMount() {
		window.onresize=this.updateSize;
		setTimeout(this.updateSize,0);
	}

	render() {
		let ctx=useContext(AppContext);

		if (ctx.error)
			return (<div>{String(ctx.error)}</div>);

		if (ctx.busy)
			return (<div>LOADING...</div>);

		let cls="";
		if (ctx.recording)
			cls="recording";

		//<TapHighlight />

		return (
			<div class={cls}>
				<Header />
				{IF(!ctx.isSongOpen(),()=>
					<Front />
				)}
				{IF(ctx.isSongOpen(),()=>{
					if (ctx.settingsVisible) {
						if (ctx.currentLayerIndex>=0)
							return <LayerSettings />;

						else
							return <SongSettings />;
					}

					else if (ctx.addLayerVisible)
						return <AddLayer />;

					else if (ctx.currentLayerIndex>=0)
						return <Layer />

					else
						return <Song />;
				})}
				{IF(ctx.aboutScreenVisible,()=>
					<AboutScreen />
				)}
				{IF(ctx.dialogText,()=>
					<Dialog />
				)}
			</div>
		);
	}
}
