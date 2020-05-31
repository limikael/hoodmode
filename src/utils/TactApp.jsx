import { h, Component, createContext } from 'preact';
import { useContext } from 'preact/compat';

export default class TactApp extends Component {
	static colors={
		white: "#fff",
		black: "#000",
		dark: "#073642",
		light: "#FDF6E3",
		primary: "#B58900",
		secondary: "#839496",
		success: "#2AA198",
		info: "#268BD2",
		danger: "#D33682",
		warning: "#CB4B16",
		bg: "#001020"
	};

	static Context=createContext();

	static computeDimensions(props) {
		let vctx=useContext(TactApp.Context);
		let d={
			width: props.w,
			height: props.h
		};

		if (vctx.orientation=="portrait") {
			if (props.pw)
				d.width=props.pw;

			if (props.ph)
				d.height=props.ph;
		}

		else if (vctx.orientation=="landscape") {
			if (props.lw)
				d.width=props.lw;

			if (props.lh)
				d.height=props.lh;
		}

		else
			throw new Error("Orientation not set!")

		if (!String(d.width).endsWith("%"))
			d.width=String(d.width)+"rem";

		if (!String(d.height).endsWith("%"))
			d.height=String(d.height)+"rem";

		return d;
	}

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

		this.base.style.width=windowWidth+"px";
		this.base.style.height=windowHeight+"px"
	}

	componentDidMount() {
		window.onresize=this.updateSize;
		setTimeout(this.updateSize,0);
	}

	render() {
		let style={
			"background-color": TactApp.colors.bg
		};

		let ctx={
			orientation: "portrait"
		};

		return (
			<div class="tact-app" style={style}>
				<TactApp.Context.Provider value={this.state}>
					{this.props.children}
				</TactApp.Context.Provider>
			</div>
		);
	}
}
