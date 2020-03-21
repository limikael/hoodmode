import { h, Component } from 'preact';
import A from './A.jsx';

export default class Layer extends Component {
	onKeyDown=(e)=>{
		if (e.target.nodeName=="INPUT")
			return;

		let k=parseInt(e.key)-1;
		if (k>=0)
			this.context.soundButtonClick(k);
	}

	componentDidMount() {
		document.addEventListener("keydown",this.onKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",this.onKeyDown);
	}

	renderSoundSymbols() {
		let instrument=this.context.getCurrentInstrument();
		let layer=this.context.getCurrentLayer();
		let buttons=new Array(16).fill(<div class="box w-1"/>);
		let numSounds=this.context.getInstrumentNumSoundsByName(instrument.name);

		for (let i=0; i<9; i++) {
			let buttonIndex=8-4*Math.floor(i/3)+i%3;
			if (layer.seq[i]) {
				let buttonClass="box w-1 bg-primary text-white ";

				if (this.context.currentGridIndex>=0 &&
						layer.seq[i][this.context.currentGridIndex])
					buttonClass+="active"

				let buttonIcon;
				if (instrument.type=="percussive")
					buttonIcon="img/"+instrument.icons[i];

				else
					buttonIcon="img/hnote-"+(1+2*(i%3))+".svg";

				buttons[buttonIndex]=
					<A class={buttonClass}
							onPress={this.context.soundButtonClick.bind(null,i)}>
						<img src={buttonIcon}/>
					</A>
			}

			else {
				buttons[buttonIndex]=
					<div class="box w-1 bg-primary"/>
			}

		}

		let cls="box w-1 bg-warning text-white ";
		if (this.context.currentGridIndex>=0 &&
					layer.stacc[this.context.currentGridIndex])
			cls+="active";

		buttons[12]=(
			<A class={cls}
					onPress={this.context.toggleCurrentLayerStacc}>
				<img src="img/rest.svg"/>
			</A>
		);

		let currentVel=null;
		if (this.context.currentGridIndex>=0 &&
				this.context.currentLayerHasSoundAt(this.context.currentGridIndex))
			currentVel=layer.vel[this.context.currentGridIndex];

		let sizeClasses=["tiny","small",""];
		let vels=[0.25,0.50,1];
		for (let i=0; i<3; i++) {
			let cls="box w-1 bg-warning text-white "+sizeClasses[i]+" ";

			if (currentVel==vels[i])
				cls+="active";

			buttons[13+i]=(
				<A class={cls}
						href="#"
						onPress={this.context.setCurrentLayerVel.bind(null,vels[i])}>
					<img src="img/note.svg"/>
				</A>
			);
		}

		if (instrument.type=="harmonic") {
			for (let octave of [0,1,2]) {
				let cls="box w-1 bg-info text-white ";
				if (this.context.currentGridIndex>=0 &&
						this.context.currentLayerHasChordAt(this.context.currentGridIndex,octave))
					cls+="active";

				buttons[11-octave*4]=(
					<A class={cls}
							href="#"
							onPress={this.context.chordButtonClick.bind(null,octave)}>
						<img src="img/hnote-chord.svg"/>
					</A>
				);
			}
		}

		return buttons;
	}

	renderSequence() {
		let layer=this.context.getCurrentLayer();
		let res=[];
		let velCls={
			0.25: "tiny",
			0.5: "small",
			1: ""
		};

		for (let gridIndex=0; gridIndex<16; gridIndex++) {
			let cls="box w-1 beat-grid beat-"+gridIndex+" ";

			if (gridIndex==this.context.currentGridIndex)
				cls+="bg-light ";

			else
				cls+="bg-black text-white ";

			let icon=null;
			if (layer.stacc[gridIndex])
				icon=<img src="img/rest.svg"/>;

			else if (this.context.currentLayerHasSoundAt(gridIndex)) {
				icon=<img src="img/note.svg"/>;
				cls+=velCls[layer.vel[gridIndex]];
			}

			res.push(
				<A class={cls}
						onPress={this.context.gridIndexClick.bind(null,gridIndex)}>
					{icon}
				</A>
			);
		}

		return res;
	}

	render() {
		let layer=this.context.getCurrentLayer();

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
