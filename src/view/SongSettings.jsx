import { h, Component } from 'preact';

export default class SongSettings {
	render() {
		return (
			<div class="pane-container">
				<div class="pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">SONG SETTINGS</div>
					<a class="bg-warning form-button">Remove Layer</a>
				</div>
			</div>
		);
	}
}
