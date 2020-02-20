import { h, Component } from 'preact';

export default class AddLayer {
	render() {
		return (
			<div class="pane-container">
				<div class="pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">ADD LAYER</div>
					{this.context.instruments.map((instrument,index)=>(
						<a class="table-row table-row-border text-white bg-warning"
								href="#"
								onClick={this.context.addLayer.bind(null,instrument.name)}>
							{instrument.name}
						</a>
					))}
				</div>
			</div>
		);
	}
}
