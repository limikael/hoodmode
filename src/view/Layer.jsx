import { h, Component } from 'preact';

export default class Layer extends Component {
	renderSoundSymbols() {
		let instrument=this.context.getCurrentInstrument();
		let layer=this.context.getCurrentLayer();
		let buttons=new Array(16).fill(<div class="grid-button"/>);
		let numSounds=this.context.getInstrumentNumSoundsByName(instrument.name);

		for (let i=0; i<9; i++) {
			let buttonIndex=4*Math.floor(i/3)+i%3;
			if (layer.seq[i]) {
				let buttonClass="grid-button bg-primary text-white ";

				if (this.context.currentGridIndex>=0 &&
						layer.seq[i][this.context.currentGridIndex])
					buttonClass+="active"

				let buttonIcon;
				if (instrument.type=="percussive")
					buttonIcon="img/"+instrument.icons[i];

				buttons[buttonIndex]=
					<a class={buttonClass}
							href="#"
							onClick={this.context.soundButtonClick.bind(null,i)}>
						<img src={buttonIcon}/>
					</a>
			}

			else {
				buttons[buttonIndex]=
					<div class="grid-button bg-primary"/>
			}

		}

/*		if (instrument.type=="percussive") {
			for (let i=0; i<instrument.icons.length; i++) {
				let buttonClass="grid-button bg-primary text-white ";

				if (this.context.currentGridIndex>=0)
					if (layer.seq[i][this.context.currentGridIndex])
						buttonClass+="active"

				a.push(
					<a class={buttonClass}
							href="#"
							onMouseDown={this.context.playCurrentInstrument.bind(null,i)}>
						<img src={"img/"+instrument.icons[i]}/>
					</a>
				);

				if (i==2)
					a.push(
						<div class="grid-button"/>
					);
			}
		}*/

		return buttons;
	}

	renderSequence() {
		let layer=this.context.getCurrentLayer();
		let res=[];

		for (let gridIndex=0; gridIndex<16; gridIndex++) {
			let cls="grid-button beat-grid beat-"+gridIndex+" ";

			if (gridIndex==this.context.currentGridIndex)
				cls+="bg-light";

			else
				cls+="bg-black";

			let a=[];
			for (let soundIndex=0; soundIndex<9; soundIndex++) {
				if (layer.seq[soundIndex] && layer.seq[soundIndex][gridIndex])
					a.push(<div class="grid-beat grid-beat-active active"/>);

				else
					a.push(<div class="grid-beat"/>);
			}

			res.push(
				<a class={cls}
						href="#"
						onMouseDown={this.context.gridIndexClick.bind(null,gridIndex)}>
					{a}
				</a>
			);
		}

		return res;
	}

	render() {
		let layer=this.context.getCurrentLayer();

		return (
			<div class="pane-container">
				<div class="pane border border-dark">
					<div class="pane-header text-secondary bg-dark">SOUNDS</div>
					{this.renderSoundSymbols()}
				</div>
				<div class="pane bg-dark">
					<div class="pane-header text-secondary bg-dark">SEQUENCE</div>
					{this.renderSequence()}
				</div>
			</div>
		);
	}
}
