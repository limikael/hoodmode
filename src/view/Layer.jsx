import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';

export default class Layer extends Component {
	onKeyDown=(e)=>{
		let ctx=useContext(AppContext);

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
		let ctx=useContext(AppContext);

		let instrument=ctx.getCurrentInstrument();
		let layer=ctx.getCurrentLayer();
		let buttons=new Array(16).fill(<div class="box w-1"/>);
		let numSounds=ctx.getInstrumentNumSoundsByKey(instrument.key);

		for (let i=0; i<9; i++) {
			let buttonIndex=8-4*Math.floor(i/3)+i%3;
			if (i<numSounds) {
				let buttonClass="box w-1 bg-primary text-white ";

				if (ctx.currentGridIndex>=0 &&
						layer.seq[ctx.currentGridIndex].sounds.includes(i))
					buttonClass+="active"

				let buttonIcon;
				if (instrument.type=="percussive")
					buttonIcon="img/"+instrument.icons[i];

				else
					buttonIcon="img/hnote-"+(1+2*(i%3))+".svg";

				buttons[buttonIndex]=
					<A class={buttonClass}
							onPress={ctx.soundButtonClick.bind(null,i)}>
						<img src={buttonIcon}/>
					</A>
			}

			else {
				buttons[buttonIndex]=
					<div class="box w-1 bg-primary"/>
			}

		}

		let cls="box w-1 bg-warning text-white ";
		if (ctx.currentGridIndex>=0 &&
					layer.seq[ctx.currentGridIndex].stacc)
			cls+="active";

		buttons[12]=(
			<A class={cls}
					onPress={ctx.toggleCurrentLayerStacc}>
				<img src="img/rest.svg"/>
			</A>
		);

		let currentVel=null;
		if (ctx.currentGridIndex>=0 &&
				ctx.currentLayerHasSoundAt(ctx.currentGridIndex))
			currentVel=layer.seq[ctx.currentGridIndex].vel;

		let sizeClasses=["tiny","small",""];
		let vels=[0.25,0.50,1];
		for (let i=0; i<3; i++) {
			let cls="box w-1 bg-warning text-white "+sizeClasses[i]+" ";

			if (currentVel==vels[i])
				cls+="active";

			buttons[13+i]=(
				<A class={cls}
						href="#"
						onPress={ctx.setCurrentLayerVel.bind(null,vels[i])}>
					<img src="img/note.svg"/>
				</A>
			);
		}

		if (instrument.type=="harmonic") {
			for (let octave of [0,1,2]) {
				let cls="box w-1 bg-info text-white ";
				if (ctx.currentGridIndex>=0 &&
						ctx.currentLayerHasChordAt(ctx.currentGridIndex,octave))
					cls+="active";

				buttons[11-octave*4]=(
					<A class={cls}
							href="#"
							onPress={ctx.chordButtonClick.bind(null,octave)}>
						<img src="img/hnote-chord.svg"/>
					</A>
				);
			}
		}

		return buttons;
	}

	renderSequence() {
		let ctx=useContext(AppContext);

		let layer=ctx.getCurrentLayer();
		let res=[];
		let velCls={
			0.25: "tiny",
			0.5: "small",
			1: ""
		};

		for (let gridIndex=0; gridIndex<16; gridIndex++) {
			let cls="box w-1 beat-grid beat-"+gridIndex+" ";

			if (gridIndex==ctx.currentGridIndex)
				cls+="bg-light ";

			else
				cls+="bg-black text-white ";

			let icon=null;
			if (layer.seq[gridIndex].stacc)
				icon=<img src="img/rest.svg"/>;

			else if (ctx.currentLayerHasSoundAt(gridIndex)) {
				icon=<img src="img/note.svg"/>;
				cls+=velCls[layer.seq[gridIndex].vel];
			}

			res.push(
				<A class={cls}
						onPress={ctx.gridIndexClick.bind(null,gridIndex)}>
					{icon}
				</A>
			);
		}

		return res;
	}

	render() {
		let ctx=useContext(AppContext);
		let layer=ctx.getCurrentLayer();

		return (
			<div class="pane-container rev-portrait">
				<div class="pane box border border-dark">
					<div class="pane-header text-secondary bg-dark">SOUNDS</div>
					{this.renderSoundSymbols()}
				</div>
				<div class="pane box bg-dark">
					<div class="pane-header text-secondary bg-dark">SEQUENCE</div>
					{this.renderSequence()}
				</div>
			</div>
		);
	}
}
