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
		let paneWidth=parseFloat(cs.getPropertyValue('--paneWidth'));
		let paneHeight=parseFloat(cs.getPropertyValue('--paneHeight'));
		let headerHeight=parseFloat(cs.getPropertyValue('--headerHeight'));

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

		return (
			<div>
				<div class="header">
					<div class="header-left">
						<div class="header-button transparent">
							<img src="img/arrow-left.svg"/>
						</div>
					</div>
					hello..
					<div class="header-right">
						<a class="header-button"
								href="#"
								onClick={this.onPlayClick}>
							<img src="img/play-fill.svg"/>
						</a>
						<div class="header-button">
							<img src="img/circle-fill.svg"/>
						</div>
						<div class="header-button transparent">
							<img src="img/gear-fill.svg"/>
						</div>
					</div>
				</div>
				<div class="pane-container">
					{/*<div class="double-pane">
						<div class="double-pane-inner">
							<div class="pane-header">LAYERS</div>
							hello
						</div>
					</div>*/}
					<div class="pane">
						<div class="pane-inner">
							<div class="pane-header">LAYERS</div>
							<div>
								<div class="grid-button empty">+</div>
								<div class="grid-button">Am7</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
							</div>
							<div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
							</div>
							<div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
							</div>
							<div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
							</div>
						</div>
					</div>
					<div class="pane">
						<div class="pane-inner">
							<div class="pane-header">SEQUENCE</div>
							<div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
							</div>
							<div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
							</div>
							<div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
							</div>
							<div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
								<div class="grid-button">A</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
