import { h, Component } from 'preact';

export default class Song extends Component {
	render() {
		let song=this.context.getCurrentSong();

		return (
			<div class="pane-container">
				{<div class="pane box border border-dark">
					<div class="pane-header text-secondary">LAYERS</div>
					{song.layers.map((layer,index)=>{
						let cls="box bg-danger text-white w-2 ";
						let icon="img/toggle-on.svg";

						if (!layer.audible) {
							icon="img/toggle-off.svg";
							cls+="faded";
						}

						return (
							<div class={cls}>
								<a href="#" class="layer-icon"
									onClick={this.context.setLayerIndex.bind(null,index)}>
									<img src={"img/"+this.context.getInstrumentByName(layer.instrumentName).icon}/>
								</a>
								<a href="#" class="layer-icon"
									onClick={this.context.toggleLayerAudible.bind(null,index)}>
									<img src={icon}/>
								</a>
							</div>
						);
					})}

					<a class="box border border-white text-white w-1"
							href="#"
							onClick={this.context.showAddLayer}>
						+
					</a>
				</div>}
				<div class="pane box border border-dark">
					<div class="pane-header text-secondary bg-dark chords">CHORDS</div>
					{this.context.getChordLabels().map((label, index)=>{
						let cls="box w-1 bg-success text-light ";
						if (index==this.context.currentChordIndex)
							cls+=" active beat-0 beat-4 beat-8 beat-12";

						return (
							<a class={cls}
									href="#"
									onClick={this.context.setCurrentChordIndex.bind(null,index)}>
								{label}
							</a>
						)
					})}
				</div>
			</div>
		);
	}
}
