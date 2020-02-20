import { h, Component } from 'preact';

export default class Song extends Component {
	render() {
		let song=this.context.getCurrentSong();

		return (
			<div class="pane-container">
				<div class="pane border border-dark">
					<div class="pane-header text-secondary bg-dark">LAYERS</div>
					{song.layers.map((layer,index)=>
						<a class="grid-button bg-danger text-white"
								href="#"
								onClick={this.context.setLayerIndex.bind(null,index)}>
							<img src={"img/"+this.context.getInstrumentByName(layer.instrumentName).icon}/>
						</a>
					)}

					<a class="grid-button empty text-white"
							href="#"
							onClick={this.context.showAddLayer}>
						+
					</a>
				</div>
				<div class="pane border border-dark">
					<div class="pane-header text-secondary bg-dark">CHORDS</div>
					{this.context.getChordLabels().map((label)=>
						<a class="grid-button bg-success text-light">{label}</a>
					)}
				</div>
			</div>
		);
	}
}
