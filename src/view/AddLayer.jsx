import { h, Component } from 'preact';
import InstrumentListItem from './InstrumentListItem.jsx';

export default class AddLayer extends Component {
	onCloseClick=()=>{
		this.props.onClose(null);
	}

	onInstrumentClick=(instrument)=>{
		console.log("inst click:"+instrument.getLabel());
		this.props.onClose(instrument);
	}

	render() {
		return (
			<div class="card border-primary">
				<div class="card-header">
					Add Layer
					<button type="button" class="close" onClick={this.onCloseClick}>
						<span>&times;</span>
					</button>
        		</div>
				<div class="card-body">
					<div class="list-group">
						<p class="list-group-item active">Instruments</p>
						{this.props.app.instruments.map((instrument,index)=>{
							return (
								<InstrumentListItem key={index}
										instrument={instrument}
										onClick={this.onInstrumentClick.bind(this,instrument)}/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}