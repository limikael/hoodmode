import { h, Component } from 'preact';

export default class LayerSettings {
	render() {
		return (
			<div class="pane-container">
				<div class="pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">LAYER SETTINGS</div>
					<a class="bg-danger form-button"
							href="#"
							onClick={this.context.deleteCurrentLayer}>
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
