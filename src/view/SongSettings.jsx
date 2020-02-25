import { h, Component } from 'preact';

export default class SongSettings {
	render() {
		return (
			<div class="pane-container">
				<div class="pane box double bg-dark">
					<div class="pane-header bg-dark text-secondary">SONG SETTINGS</div>
					<div class="input-group">
						Song Name<br/>
						<div class="box border bg-white border-black text-black w-4">
							<input type="text"
								value={this.context.getCurrentSong().name}
								onChange={this.context.setCurrentSongName}/>
						</div>
					</div>

					<div class="input-group">
						Tempo<br/>
						<div class="box border bg-white border-black text-black w-4">
							<input type="text" />
						</div>
					</div>

					<div class="input-group">
						Key<br/>
						<div class="box border bg-white border-black text-black w-4">
							<input type="text" />
						</div>
					</div>

					<div class="input-group">
						Mode<br/>
						<div class="box border bg-white border-black text-black w-4">
							<input type="text" />
						</div>
					</div>

					<div class="form-buttons">
						<a class="bg-danger box text-white"
								href="#"
								onClick={this.context.deleteCurrentSong}>
							Remove
						</a>
						<a class="bg-primary box text-white"
								href="#"
								onClick={this.context.toggleSettings}>
							Close
						</a>
					</div>
				</div>
			</div>
		);
	}
}
