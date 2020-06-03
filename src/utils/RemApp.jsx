import { h, Component, createContext } from 'preact';

export default class RemApp extends Component {
	static Context=createContext();

	constructor() {
		super();

		this.state={
			orientation: "portrait"
		};
	}

	updateSize=()=>{
		let windowWidth=document.documentElement.clientWidth;
		let windowHeight=document.documentElement.clientHeight;
		let contentWidth,contentHeight;
		let orientation;

		if (windowHeight>windowWidth) {
			orientation="portrait";
			contentWidth=this.props.portraitWidth;
			contentHeight=this.props.portraitHeight;
		}

		else {
			orientation="landscape";
			contentWidth=this.props.landscapeWidth;
			contentHeight=this.props.landscapeHeight;
		}

		let fontSize;
		if (windowWidth/contentWidth<windowHeight/contentHeight)
			fontSize=windowWidth/contentWidth;

		else
			fontSize=windowHeight/contentHeight;

		document.querySelector("html").style.fontSize=fontSize+"px";

		this.setState({
			orientation: orientation
		});
	}

	componentDidMount() {
		window.onresize=this.updateSize;
		setTimeout(this.updateSize,0);
	}

	render() {
		let ctx={
			orientation: "portrait"
		};

		return (
			<div class="rem-app">
				<RemApp.Context.Provider value={this.state}>
					{this.props.children}
				</RemApp.Context.Provider>
			</div>
		);
	}
}
