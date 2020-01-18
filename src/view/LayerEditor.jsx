import { h, Component } from 'preact';

export default class LayerEditor {
	onInstrumentButtonPress=(index)=>{
		this.props.layer.instrument.play(index);
	};

	onKeyDown=(e)=>{
		if (parseInt(e.key)) {
			this.props.layer.instrument.play(parseInt(e.key)-1);
		}
	}

	componentDidMount() {
		document.addEventListener("keydown",this.onKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",this.onKeyDown);
	}

	renderRow(label, index) {
		return (
			<tr>
				<th>{label}</th>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		);
	}

	render() {
		let buttons=this.props.layer.instrument.getSoundLabels().map((label,index)=>{
			return (
				<button type="button" class="btn btn-primary btn-lg mb-2 mr-2"
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
					<ul class="nav nav-tabs mb-3">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="tab" href="#pad">Pad</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#sequence">Sequence</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#layer">Layer</a>
						</li>
					</ul>

					<div class="tab-content">
						<div class="tab-pane fade active show" id="pad">
							{buttons}
						</div>
						<div class="tab-pane fade" id="sequence">
							<table class="sequence-table">
								{this.props.layer.instrument.getSoundLabels().map(this.renderRow)}
							</table>
						</div>
						<div class="tab-pane fade" id="layer">
							<button type="button" class="btn btn-danger">Delete Layer</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}