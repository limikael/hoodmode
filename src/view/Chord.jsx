import { h, Component } from 'preact';

export default class Chord extends Component {
	onChordButtonClick=(index)=>{
		this.props.app.setCurrentChordIndex(index);
		this.forceUpdate();
	}

	onAddChordClick=()=>{
		this.props.app.addSequenceChord();
		this.props.app.saveToLocalStorage();
		this.forceUpdate();
	}

	onSequenceChordChange=(index,e)=>{
		let v=parseInt(e.target.value);
		let song=this.props.app.getCurrentSong();

		if (v<0)
			song.chordSequence.splice(index,1);

		else
			song.chordSequence[index]=v;

		this.props.app.saveToLocalStorage();
		this.forceUpdate();
	}

	onTabSelect=(tab)=>{
		switch (tab) {
			case "perform":
				this.props.app.chordSequenceIndex=-1;
				break;

			case "sequence":
				this.props.app.chordSequenceIndex=0;
				break;
		}
	}

	render() {
		return (
			<div class="card border-success">
				<div class="card-header">
					Chord
        		</div>
				<div class="card-body">
					<ul class="nav nav-tabs mb-3">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="tab" href="#perform"
									onClick={this.onTabSelect.bind(this,"perform")}>
								Perform
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#sequence"
									onClick={this.onTabSelect.bind(this,"sequence")}>
								Sequence
							</a>
						</li>
					</ul>

					<div class="tab-content">
						<div class="tab-pane fade active show" id="perform">
							{this.props.app.getChordLabels().map((label,index)=>{
								let cls="btn btn-success mr-2 mb-2";

								if (index==this.props.app.currentChordIndex)
									cls+=" active"

								return (
									<button class={cls}
											style={{'width': '5em', 'height': '5em'}}
											onClick={this.onChordButtonClick.bind(this,index)}>
										{label}
									</button>
								);
							})}
						</div>
						<div class="tab-pane fade" id="sequence">
							{this.props.app.getCurrentSong().chordSequence.map(
								(sequenceChord,sequenceIndex)=>{
								return (
									<select class="btn btn-success mr-2 mb-2 active"
											style={{'width': '5em', 'height': '5em'}}
											onChange={this.onSequenceChordChange.bind(this,sequenceIndex)}
											key={sequenceIndex}>
										{this.props.app.getChordLabels().map((label,index)=>{
											let selected=(sequenceChord==index);
											return (
												<option value={index}
														selected={selected}>
													{label}
												</option>
											);
										})}
										<option class="bg-danger" value="-1">Delete</option>
									</select>
								);
							})}
							<button class="btn btn-light mb-2"
									style={{'width': '5em', 'height': '5em'}}
									onClick={this.onAddChordClick}>
								+
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}