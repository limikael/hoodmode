import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';
import SongSettings from './SongSettings.jsx';
import LayerList from './LayerList.jsx';
import AddLayer from './AddLayer.jsx';
import LayerEditor from './LayerEditor.jsx';
import Chord from './Chord.jsx';

export default class App extends Component {
	updateSize=()=>{
		let w=window.innerWidth;
		let h=window.innerHeight;

		console.log("size: "+w+"x"+h);

		let wPane=12,hPane=10;

		let wChars,hChars;
		if (h>w) {
			hChars=2*hPane+3;
			wChars=wPane;
		}

		else {
			hChars=hPane+3;
			wChars=2*wPane;
		}

		if (w/wChars<h/hChars) {
			document.querySelector("body").style.fontSize=(w/wChars)+"px";
		}

		else {
			document.querySelector("body").style.fontSize=(h/hChars)+"px";
		}

		for (let el of document.querySelectorAll("div.pane")) {
			if (h>w)
				el.style.display="block";

			else
				el.style.display="inline-block";
		}
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
