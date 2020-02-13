import { h, Component } from 'preact';

export default class LayerEditor extends Component {
	onInstrumentButtonPress=(index)=>{
		let note=this.props.layer.instrument.createNote(index);
		note.setChordCents(this.props.app.getCurrentChordCents());
		note.connect(this.props.app.audioContext.destination);
		note.playNow();
	};

	onKeyDown=(e)=>{
		if (parseInt(e.key)) {
			this.onInstrumentButtonPress(parseInt(e.key)-1);
		}
	}

	componentDidMount() {
		document.addEventListener("keydown",this.onKeyDown);
		$('.nav-tabs a[href="#pad"]').tab('show');
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",this.onKeyDown);
	}

	onSeqClick=(sound, pos)=>{
		this.context.toggleCurrentLayerSeq(sound,pos);
	}

	onVelClick(index) {
		if (true) //this.props.layer.hasSoundAt(index))
			this.context.toggleCurrentLayerVel(index);

		else
			this.context.toggleCurrentLayerStacc(index);
	}

	onVolumeChange=(e)=>{
		this.context.setCurrentLayerVolume(e.target.value);
	};

	renderRow=(label, soundIndex)=>{
		let layer=this.context.getCurrentLayer();

		let a=[];
		for (let i=0; i<16; i++) {
			let cls='';

			if (layer.seq[soundIndex][i])
				cls='bg-primary';

			/*else if (i==this.props.beatIndex)
				cls='bg-light';*/

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

	renderSequenceTable() {
		let layer=this.context.getCurrentLayer();
		let instrument=this.context.getCurrentInstrument();
		let rows=instrument.getSoundLabels().map(this.renderRow).reverse();

		rows.push(<tr><td class='empty' style={{border: 'none'}}/></tr>);

		let a=[];
		for (let i=0; i<16; i++) {
			if (true /*this.props.layer.hasSoundAt(i)*/) {
				let ja=[];
				for (let j=0; j<4; j++) {
					if (layer.vel[i]>=(1-j*.25))
						ja.push(<div class="seq-vel bg-danger"/>);

					else
						ja.push(<div class="seq-vel"/>);
				}

				a.push(<td onClick={this.onVelClick.bind(this,i)}>{ja}</td>);
			}

			else if (layer.stacc[i]) {
				a.push(
					<td onClick={this.onVelClick.bind(this,i)}>
						<span class="badge badge-pill badge-danger">.</span>
					</td>
				);
			}

			else {
				a.push(<td onClick={this.onVelClick.bind(this,i)}/>);
			}
		}

		rows.push(
			<tr>
				<th>Vel</th>
				{a}
			</tr>
		);

		return rows;
	}

	render() {
		let layer=this.context.getCurrentLayer();
		let instrument=this.context.getCurrentInstrument();

		let buttons=instrument.getSoundLabels().map((label,index)=>{
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
					{layer.instrumentName}
					<button type="button" class="close"
							onClick={this.context.hideCurrentLayer}>
						<span>&times;</span>
					</button>
        		</div>
				<div class="card-body">
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
								{this.renderSequenceTable()}
							</table>
						</div>
						<div class="tab-pane fade" id="layer">
							<label for="volumeRange">Volume</label>
							<input type="range" class="custom-range mb-3" id="volumeRange"
									min="0" max="1" step="0.01"
									value={layer.volume}
									onChange={this.onVolumeChange}/>
							<button type="button" class="btn btn-danger"
									onClick={this.context.deleteCurrentLayer}>
								Delete Layer
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}