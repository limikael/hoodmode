import { h, Component } from 'preact';

export default class LayerEditor {
	onInstrumentButtonPress=(index)=>{
		this.props.layer.instrument.play(index);
	};

	render() {
		let buttons=this.props.layer.instrument.getSoundLabels().map((label,index)=>{
			return (
				<button type="button" class="btn btn-primary btn-lg mb-3 mr-3"
						style={{width: '6em', height: '6em'}}
						onMouseDown={this.onInstrumentButtonPress.bind(this,index)}>
					{label}
				</button>
			);
		});

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