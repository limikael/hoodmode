import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';
import Header from './Header.jsx';
import Front from './Front.jsx';
import Song from './Song.jsx';
import SongSettings from './SongSettings.jsx';
import LayerSettings from './LayerSettings.jsx';
import AddLayer from './AddLayer.jsx';
import Layer from './Layer.jsx';
import SelectChord from './SelectChord.jsx';

export default class App extends Component {
	updateSize=()=>{
		let windowWidth=window.innerWidth;
		let windowHeight=window.innerHeight;

		let cs=getComputedStyle(document.documentElement);
		let paneWidth=parseFloat(cs.getPropertyValue('--paneWidth'));
		let paneHeight=parseFloat(cs.getPropertyValue('--paneHeight'));

		let contentWidth,contentHeight;
		if (windowHeight>windowWidth) {
			contentHeight=2*(paneHeight+1)+2;
			contentWidth=paneWidth+1;
			document.querySelector("body").classList.add("portrait");
			document.querySelector("body").classList.remove("landscape");
		}

		else {
			contentHeight=paneHeight+2+1;
			contentWidth=2*(paneWidth+1);
			document.querySelector("body").classList.add("landscape");
			document.querySelector("body").classList.remove("portrait");
		}

		let fontSize;
		if (windowWidth/contentWidth<windowHeight/contentHeight)
			fontSize=windowWidth/contentWidth;

		else
			fontSize=windowHeight/contentHeight;

		document.querySelector("html").style.fontSize=fontSize+"px";

		let s=document.documentElement.style;
		s.setProperty("--paneMarginTop",(windowHeight-fontSize*contentHeight)/2);
		s.setProperty("--paneMarginLeft",(windowWidth-fontSize*contentWidth)/2);
	}

	onPlayClick=()=>{
		console.log("play");
	}

	componentDidMount() {
		window.onresize=this.updateSize;
		setTimeout(this.updateSize,0);
	}

	render() {
		if (this.context.busy)
			return (<div>LOADING...</div>);

		let cls="";
		if (this.context.recording)
			cls="recording";

		return (
			<div class={cls}>
				<Header />
				{IF(!this.context.isSongOpen(),()=>
					<Front />
				)}
				{IF(this.context.isSongOpen(),()=>{
					if (this.context.settingsVisible) {
						if (this.context.currentLayerIndex>=0)
							return <LayerSettings />;

						else
							return <SongSettings />;
					}

					else if (this.context.addLayerVisible)
						return <AddLayer />;

					else if (this.context.currentLayerIndex>=0)
						return <Layer />

					else
						return <Song />;
				})}
			</div>
		);
	}
}
