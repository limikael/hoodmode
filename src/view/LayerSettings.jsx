import { h, Component } from 'preact';
import A from './A.jsx';

export default class LayerSettings {
	render() {
		let instrument=this.context.getCurrentInstrument();
		let layer=this.context.getCurrentLayer();

		return (
			<div class="pane-container">
				<div class="box pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">LAYER SETTINGS</div>
					<div class="box w-4 el text-white">
						<img src={"img/"+instrument.icon}/>
						{instrument.name}
					</div>

					<br/><br/>

					<div class="input-group">
						Volume<br/>
						<div class="box border bg-white border-black text-black w-4">
							<input type="range" min="0" max="1" step="0.01"
								value={layer.volume}
								onChange={this.context.setCurrentLayerVolume}
							/>
						</div>
					</div>

					<div class="form-buttons">
						<A class="box bg-danger text-white"
								onClick={this.context.deleteCurrentLayer}>
							Remove Layer
						</A>
						<A class="box bg-primary form-button text-white"
								onClick={this.context.toggleSettings}>
							Close
						</A>
					</div>
				</div>
			</div>
		);
	}
}
