import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';
import Header from './Header.jsx';
import Front from './Front.jsx';

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
				<Header />
				{IF(this.context.currentSongIndex<0,()=>
					<Front />
				)}
			</div>
		);
	}
}
