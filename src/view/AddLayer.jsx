import { h, Component } from 'preact';

export default class AddLayer {
	render() {
		return (
			<div class="pane-container">
				<div class="box pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">ADD LAYER</div>
					{this.context.instruments.map((instrument,index)=>(
						<a class="box w-4 text-white bg-danger el"
								href="#"
								onClick={this.context.addLayer.bind(null,instrument.name)}>
							<img src={"img/"+instrument.icon}/>
							{instrument.name}
						</a>
					))}
				</div>
			</div>
		);
	}
}