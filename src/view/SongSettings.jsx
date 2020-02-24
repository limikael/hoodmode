import { h, Component } from 'preact';

export default class SongSettings {
	render() {
		return (
			<div class="pane-container">
				<div class="pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">SONG SETTINGS</div>
					Song Name<br/>
					<input type="text" class="form-input"
							value={this.context.getCurrentSong().name}/>
					<br/><br/>
					Tempo<br/>
					<input type="text" class="form-input"/><br/><br/>

					<a class="bg-danger form-button"
							href="#"
							onClick={this.context.deleteCurrentSong}>
						Remove
					</a>
					<a class="bg-primary form-button"
							href="#"
							onClick={this.context.toggleSettings}>
						Close
					</a>
					<br/>
				</div>
			</div>
		);
	}
}
