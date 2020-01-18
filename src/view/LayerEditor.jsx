import { h, Component } from 'preact';

export default class LayerEditor extends Component {
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

	onSeqClick=(sound, pos)=>{
		if (this.props.layer.seq[sound][pos]) {
			this.props.layer.seq[sound][pos]=0;
		}

		else {
			this.props.layer.seq[sound][pos]=1;
			this.props.layer.instrument.play(sound);
		}

		this.forceUpdate();
	}

	renderRow=(label, soundIndex)=>{
		let a=[];
		for (let i=0; i<16; i++) {
			let cls='';

			if (this.props.layer.seq[soundIndex][i])
				cls='bg-primary';

			else if (!(i%4))
				cls='seq-beat'

			a.push(
				<td onClick={this.onSeqClick.bind(this,soundIndex,i)}
						class={cls}/>
			);
		}

		return (
			<tr>
				<th>{label}</th>
				{a}
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
								{this.props.layer.instrument.getSoundLabels().map(this.renderRow).reverse()}
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