import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';
import RemApp from '../utils/RemApp.jsx';
import { useSpring, animated, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import tutorialcontent from '../model/tutorialcontent';

export default class Tutorial extends Component {
	constructor(props) {
		super();

		this.state={
			page: props.startPage
		};
	}

	render() {
		let ctx=useContext(StateStore.Context);
		let vctx=useContext(RemApp.Context);

		let pageSize=16;
		if (vctx.orientation=="landscape")
			pageSize=34;

		const [props, set] = useSpring(() => ({ 
			x: (-this.state.page*pageSize)+"rem",
			config: config.stiff,
			from: {
				x: (-this.state.page*pageSize)+"rem"
			}
		}));

		const bind = useDrag((e) => {
			if (e.down) {
				let rem=RemApp.pixelsToRem(e.movement[0]);
				rem-=pageSize*this.state.page;

				set({x: rem+"rem", immediate: true})
			}

			else {
				let rem=RemApp.pixelsToRem(e.movement[0]);
				let newPage=this.state.page-Math.round(rem/pageSize);

				if (newPage<0)
					newPage=0;

				if (newPage>=tutorialcontent.length)
					newPage=tutorialcontent.length-1;

				set({x: (-newPage*pageSize)+"rem"})

				this.setState({
					page: newPage
				});
			}
		});

		set({x: (-this.state.page*pageSize)+"rem"});

		let imgStyle={
			width: "16rem",
			height: "12rem",
			"margin-top": "1rem",
			"margin-bottom": "1rem"
		};

		let content=[];
		for (let i=0; i<tutorialcontent.length; i++) {
			if (vctx.orientation=="landscape") {
				imgStyle.width="12rem";
				imgStyle.height="9rem";
				content.push(
					<div style={{height: "17rem", width: "34rem", display: "inline-block",
							"position": "relative", "vertical-align": "top"}}>
						<img draggable={false} style={imgStyle}
								src={tutorialcontent[i].image}/>
						<div class="dialog-text"
								style={{"color": "#000", width: "16rem", 'white-space': "normal",
									"position": "absolute", "left": "16rem", "top": 0}}>
							{tutorialcontent[i].text}
						</div>
					</div>
				);
			}

			else {
				content.push(
					<div style={{height: "31rem", width: "16rem", display: "inline-block",
							"position": "relative", "vertical-align": "top"}}>
						<img draggable={false} style={imgStyle}
								src={tutorialcontent[i].image}/>
						<div class="dialog-text" style={{"color": "#000", width: "16rem", 'white-space': "normal"}}>
							{tutorialcontent[i].text}
						</div>
					</div>
				);
			}
		}

		let dots=[];
		for (let i=0; i<tutorialcontent.length; i++) {
			let style={
				display: "inline-block",
				width: "0.5rem",
				height: "0.5rem",
				margin: "0.25rem",
				opacity: 0.75
			}

			if (i==this.state.page) {
				style.filter="invert(59%) sepia(53%) saturate(4307%) hue-rotate(180deg) brightness(87%) contrast(89%)";
				style.opacity=1;
				style.margin=0;
				style.width="1rem";
				style.height="1rem";
			}

			dots.push(
				<img src="img/circle-fill.svg" style={style}/>
			);
		}

		if (vctx.orientation=="landscape")
			return (
				<Align modal width="36rem" height="20rem" onDismiss={ctx.hideTutorial}>
					<Box bg="light" width="100%" height="100%">
						<div style={{width: "34rem", height: "18rem", position: "relative", "overflow": "hidden"}}>
							<animated.div {...bind()} style={{...props, 'white-space': "nowrap", "position": "absolute"}}>
								{content}
							</animated.div>
							<div style={{position: "absolute", "bottom": "0", "text-align": "center", "width": "100%"}}>
								{dots}
							</div>
						</div>
					</Box>
				</Align>
			);

		else
			return (
				<Align modal width="18rem" height="34rem" onDismiss={ctx.hideTutorial}>
					<Box bg="light" width="100%" height="100%">
						<div style={{width: "16rem", height: "32rem", position: "relative", "overflow": "hidden"}}>
							<animated.div {...bind()} style={{...props, 'white-space': "nowrap", "position": "absolute"}}>
								{content}
							</animated.div>
							<div style={{position: "absolute", "bottom": "0", "text-align": "center", "width": "100%"}}>
								{dots}
							</div>
						</div>
					</Box>
				</Align>
			);
	}
}