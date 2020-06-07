import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import A from './A.jsx';
import Box from '../utils/Box.jsx';
import RemApp from '../utils/RemApp.jsx';

export default class Layer extends Component {
	onKeyDown=(e)=>{
		let ctx=useContext(StateStore.Context);

		if (e.target.nodeName=="INPUT")
			return;

		let k=parseInt(e.key)-1;
		if (k>=0)
			ctx.soundButtonClick(k);
	}

	componentDidMount() {
		document.addEventListener("keydown",this.onKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",this.onKeyDown);
	}

	renderSoundSymbols() {
		let ctx=useContext(StateStore.Context);

		let instrument=ctx.getCurrentInstrument();
		let layer=ctx.getCurrentLayer();
		let buttons=new Array(16).fill(<Box width="4rem" height="4rem"/>);
		let numSounds=ctx.getInstrumentNumSoundsByKey(instrument.key);

		for (let i=0; i<9; i++) {
			let buttonIndex=8-4*Math.floor(i/3)+i%3;
			if (i<numSounds) {
				let active=(ctx.currentGridIndex>=0 &&
						layer.seq[ctx.currentGridIndex].sounds.includes(i))

				let buttonIcon;
				if (instrument.type=="percussive")
					buttonIcon="img/"+instrument.icons[i];

				else
					buttonIcon="img/hnote-"+(1+2*(i%3))+".svg";

				buttons[buttonIndex]=
					<Box width="4rem" height="4rem" active={active} bg="primary"
							onPress={ctx.soundButtonClick.bind(null,i)}>
						<img class="icon" src={buttonIcon}/>
					</Box>
			}

			else {
				buttons[buttonIndex]=
					<Box width="4rem" height="4rem" bg="primary"/>
			}

		}

		let active=(ctx.currentGridIndex>=0 &&
				layer.seq[ctx.currentGridIndex].stacc);

		buttons[12]=(
			<Box bg="warning" active={active}
					onPress={ctx.toggleCurrentLayerStacc}>
				<img src="img/rest.svg" class="icon"/>
			</Box>
		);

		let currentVel=null;
		if (ctx.currentGridIndex>=0 &&
				ctx.currentLayerHasSoundAt(ctx.currentGridIndex))
			currentVel=layer.seq[ctx.currentGridIndex].vel;

		let sizeClasses=["tiny","small",""];
		let vels=[0.25,0.50,1];
		for (let i=0; i<3; i++) {
			let active=(currentVel==vels[i])

			buttons[13+i]=(
				<Box width="4rem" height="4rem" bg="warning" active={active}
						onPress={ctx.setCurrentLayerVel.bind(null,vels[i])}>
					<img src="img/note.svg" class={"icon "+sizeClasses[i]}/>
				</Box>
			);
		}

		if (instrument.type=="harmonic") {
			for (let octave of [0,1,2]) {
				let active=(ctx.currentGridIndex>=0 &&
						ctx.currentLayerHasChordAt(ctx.currentGridIndex,octave));

				buttons[11-octave*4]=(
					<Box width="4rem" height="4rem" bg="info" active={active}
							onPress={ctx.chordButtonClick.bind(null,octave)}>
						<img src="img/hnote-chord.svg" class="icon"/>
					</Box>
				);
			}
		}

		return buttons;
	}

	renderSequence() {
		let ctx=useContext(StateStore.Context);

		let layer=ctx.getCurrentLayer();
		let res=[];
		let velCls={
			0.25: "tiny",
			0.5: "small",
			1: ""
		};

		for (let gridIndex=0; gridIndex<16; gridIndex++) {
			let cls="beat-grid beat-"+gridIndex+" ";
			let bg="black";
			let iconCls="icon";

			if (gridIndex==ctx.currentGridIndex) {
				bg="white";
				iconCls+=" dark";
			}

			let icon=null;
			if (layer.seq[gridIndex].stacc)
				icon=<img class={iconCls} src="img/rest.svg"/>;

			else if (ctx.currentLayerHasSoundAt(gridIndex)) {
				iconCls+=" "+velCls[layer.seq[gridIndex].vel];
				icon=<img class={iconCls} src="img/note.svg"/>;
			}

			res.push(
				<Box bg={bg} width="4rem" height="4rem" class={cls}
						onPress={ctx.gridIndexClick.bind(null,gridIndex)}>
					{icon}
				</Box>
			);
		}

		return res;
	}

	render() {
		let ctx=useContext(StateStore.Context);
		let vctx=useContext(RemApp.Context);
		let layer=ctx.getCurrentLayer();

		let sounds=(
			<Box width="18rem" height="18rem" border="dark">
				<div class="pane-header text-secondary bg-dark">SOUNDS</div>
				{this.renderSoundSymbols()}
			</Box>
		);

		let cls="";
		if (ctx.recording)
			cls="recording";

		let sequence=(
			<Box width="18rem" height="18rem" bg="dark" class={cls}>
				<div class="pane-header text-secondary bg-dark">SEQUENCE</div>
				{this.renderSequence()}
			</Box>
		);

		let content=[sounds,sequence];
		if (vctx.orientation=="portrait")
			content=[sequence,sounds];

		return (
			<div style={{width: "100%", height: "100%"}}>
				{content}
			</div>
		);
	}
}
