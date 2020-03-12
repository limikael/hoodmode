import { h, Component } from 'preact';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';

export default class TapHighlight extends Component {
	constructor(props) {
		super(props);

		this.state={
			showHighlight: false
		}
	}

	onContextMenu=(e)=>{
		e.stopPropagation();
		e.preventDefault();

		this.setState({
			showHighlight: true
		});

		let s=document.documentElement.style;
		s.setProperty("--tapHighlightLeft",e.clientX+"px");
		s.setProperty("--tapHighlightTop",e.clientY+"px");
	};

	onMouseUp=(e)=>{
		this.setState({
			showHighlight: false
		});
	};

	componentDidMount() {
		document.addEventListener("contextmenu",this.onContextMenu);
		document.addEventListener("mouseup",this.onMouseUp);
	}

	componentWillUnmount() {
		document.removeEventListener("contextmenu",this.onContextMenu);
		document.removeEventListener("mouseup",this.onMouseUp);
	}

	render() {
		return (
			<div class="tap-highlight">
				{IF(this.state.showHighlight,()=>
					<img src="img/tap-highlight.svg"/>
				)}
			</div>
		);
	}
}