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
			if (window.StatusBar)
				window.StatusBar.show();
		}

		else {
			orientation="landscape";
			contentWidth=this.props.landscapeWidth;
			contentHeight=this.props.landscapeHeight;
			if (window.StatusBar)
				window.StatusBar.hide();
		}

		let fontSize;
		if (windowWidth/contentWidth<windowHeight/contentHeight)
			fontSize=windowWidth/contentWidth;

		else
			fontSize=windowHeight/contentHeight;

		document.querySelector("html").style.fontSize=fontSize+"px";

		this.setState({
			orientation: orientation,
			windowWidth: windowWidth,
			windowHeight: windowHeight,
		});
	}

	static pixelsToRem(pixels) {
		let fontSize=parseFloat(document.querySelector("html").style.fontSize);
		return (pixels/fontSize);
	}

	componentDidMount() {
		window.onresize=this.updateSize;
		setTimeout(this.updateSize,0);
	}

	render() {
		let ctx={
			orientation: "portrait"
		};

		let debugStyle={
			"position": "fixed",
			"z-index": 1000,
			"background-color": "#000",
			"top": 0,
			"left": 0
		};

		return (
			<div class="rem-app">
				{/*<div style={debugStyle}>
					{this.state.windowWidth}x{this.state.windowHeight}
				</div>*/}
				<RemApp.Context.Provider value={this.state}>
					{this.props.children}
				</RemApp.Context.Provider>
			</div>
		);
	}
}
