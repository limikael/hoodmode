import { h, Component } from 'preact';

export default class AddLayer {
	render() {
		return (
			<div class="pane-container">
				<div class="double-pane">
					<div class="double-pane-inner filled">
						<div class="pane-header">ADD LAYER</div>
						{this.context.instruments.map((instrument,index)=>(
							<a class="table-row success"
									href="#"
									onClick={this.context.addLayer.bind(null,instrument.name)}>
								{instrument.name}
							</a>
						))}
					</div>
				</div>
			</div>
		);
	}
}
