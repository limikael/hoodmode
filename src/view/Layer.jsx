import { h, Component } from 'preact';

export default class Layer extends Component {
	renderSoundSymbols() {
		let instrument=this.context.getCurrentInstrument();
		let a=[];

		if (instrument.type=="percussive") {
			for (let i=0; i<instrument.icons.length; i++) {
				a.push(
					<a class="grid-button bg-primary text-white"
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
		}

		return a;
	}

	renderSequence() {
		let layer=this.context.getCurrentLayer();
		let res=[];

		for (let gridIndex=0; gridIndex<16; gridIndex++) {
			let cls="grid-button beat-grid ";

			if (gridIndex==this.context.currentGridIndex)
				cls+="bg-light";

			else
				cls+="bg-black";

			let a=[];
			for (let soundIndex=0; soundIndex<9; soundIndex++) {
				if (layer.seq[soundIndex] && layer.seq[soundIndex][gridIndex])
					a.push(<div class="grid-beat active"/>);

				else
					a.push(<div class="grid-beat"/>);
			}

			res.push(
				<a class={cls}
						href="#"
						onMouseDown={this.context.toggleGridIndex.bind(null,gridIndex)}>
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
