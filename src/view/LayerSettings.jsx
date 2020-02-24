import { h, Component } from 'preact';

export default class LayerSettings {
	render() {
		return (
			<div class="pane-container">
				<div class="box pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">LAYER SETTINGS</div>
					<a class="box bg-danger text-white"
							href="#"
							onClick={this.context.deleteCurrentLayer}>
						Remove
					</a>
					<a class="box bg-primary form-button text-white"
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
