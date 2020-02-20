import { h, Component } from 'preact';

export default class Song extends Component {
	render() {
		let song=this.context.getCurrentSong();

		return (
			<div class="pane-container">
				<div class="pane border border-dark">
					<div class="pane-header text-secondary bg-dark">LAYERS</div>
					{song.layers.map((layer,index)=>
						<a class="grid-button bg-warning">
							X
						</a>
					)}

					<a class="grid-button empty"
							href="#"
							onClick={this.context.showAddLayer}>
						+
					</a>
				</div>
				<div class="pane border border-dark">
					<div class="pane-header text-secondary bg-dark">CHORDS</div>
					{this.context.getChordLabels().slice(0,4).map((label)=>
						<a class="grid-button bg-success">{label}</a>
					)}
					{this.context.getChordLabels().slice(4,8).map((label)=>
						<a class="grid-button bg-success">{label}</a>
					)}
				</div>
			</div>
		);
	}
}
