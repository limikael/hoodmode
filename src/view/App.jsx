import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';
import SongSettings from './SongSettings.jsx';
import LayerList from './LayerList.jsx';
import AddLayer from './AddLayer.jsx';
import LayerEditor from './LayerEditor.jsx';
import Chord from './Chord.jsx';

export default class App extends Component {
	updateSize=()=>{
		let windowWidth=window.innerWidth;
		let windowHeight=window.innerHeight;

		let cs=getComputedStyle(document.documentElement);
		let paneWidth=parseInt(cs.getPropertyValue('--paneWidth'));
		let paneHeight=parseInt(cs.getPropertyValue('--paneHeight'));
		let headerHeight=parseInt(cs.getPropertyValue('--headerHeight'));

		let contentWidth,contentHeight;
		if (windowHeight>windowWidth) {
			contentHeight=2*paneHeight+headerHeight;
			contentWidth=paneWidth;
			document.querySelector("body").classList.add("portrait");
			document.querySelector("body").classList.remove("landscape");
		}

		else {
			contentHeight=paneHeight+headerHeight;
			contentWidth=2*paneWidth;
			document.querySelector("body").classList.add("landscape");
			document.querySelector("body").classList.remove("portrait");
		}

		let fontSize;
		if (windowWidth/contentWidth<windowHeight/contentHeight)
			fontSize=windowWidth/contentWidth;

		else
			fontSize=windowHeight/contentHeight;

		document.querySelector("body").style.fontSize=fontSize+"px";

		let s=document.documentElement.style;
		s.setProperty("--paneMarginTop",(windowHeight-fontSize*contentHeight)/2);
		s.setProperty("--paneMarginLeft",(windowWidth-fontSize*contentWidth)/2);
	}

	componentDidMount() {
		window.onresize=this.updateSize;
		setTimeout(this.updateSize,0);
	}

	render() {
		if (this.context.busy)
			return (<div>LOADING...</div>);

		return (
			<div>
				<div class="header">
					hello..
				</div>
				<div class="pane-container">
					<div class="pane">
						pane1
					</div>
					<div class="pane">
						pane2
					</div>
				</div>
			</div>
		);
	}
}
