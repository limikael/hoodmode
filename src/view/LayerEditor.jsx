import { h, Component } from 'preact';

export default class LayerEditor {
	render() {
		let buttons=[];
		for (let i=0; i<10; i++)
			buttons.push(
				<button type="button" class="btn btn-primary btn-lg mb-3 mr-3"
						style={{width: '6em', height: '6em'}}>
					SOUND
				</button>
			);

		return (
			<div className="card border-primary">
				<div className="card-header">
					{this.props.layer.getLabel()}
					<button type="button" class="close" onClick={this.props.onClose}>
						<span>&times;</span>
					</button>
        		</div>
				<div className="card-body">
					{buttons}
				</div>
			</div>
		);
	}
}