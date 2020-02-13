import { h, Component } from 'preact';
import InstrumentListItem from './InstrumentListItem.jsx';

export default class AddLayer extends Component {
	componentDidMount=()=>{
		$(this.base).modal('show');
		$(this.base).on('hidden.bs.modal', this.context.hideAddLayer);
	}

	onInstrumentClick=(instrument)=>{
		this.context.addLayer(instrument.name);
		$(this.base).modal('hide');
	}

	render() {
		return (
			<div className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Add Layer</h4>
							<button type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div class="list-group">
								<p class="list-group-item active">Instruments</p>
								{this.context.instruments.map((instrument,index)=>{
									return (
										<InstrumentListItem key={index}
												instrument={instrument}
												onClick={this.onInstrumentClick}/>
									);
								})}
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary"
									data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}