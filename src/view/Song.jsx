import { h, Component } from 'preact';

export default class Song extends Component {
	render() {
		let song=this.context.getCurrentSong();

		return (
			<div class="pane-container">
				<div class="pane">
					<div class="pane-inner">
						<div class="pane-header">LAYERS</div>

						{song.layers.map((layer,index)=>
							<a class="grid-button">
								X
							</a>
						)}

						<a class="grid-button empty"
								href="#"
								onClick={this.context.showAddLayer}>
							+
						</a>
					</div>
				</div>
				<div class="pane">
					<div class="pane-inner">
						<div class="pane-header">CHORDS</div>
						{this.context.getChordLabels().slice(0,4).map((label)=>
							<a class="grid-button">{label}</a>
						)}
						<br/>
						{this.context.getChordLabels().slice(4,8).map((label)=>
							<a class="grid-button">{label}</a>
						)}
					</div>
				</div>
			</div>
		);
	}
}
