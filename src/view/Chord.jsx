import { h, Component } from 'preact';
import SequenceChord from './SequenceChord.jsx';

export default class Chord extends Component {
	onChordButtonClick=(index)=>{
		this.context.setCurrentChordIndex(index);
	}

	onAddChordClick=()=>{
		this.context.addSequenceChord();
	}

	onTabSelect=(tab)=>{
		switch (tab) {
			case "perform":
				this.context.setPlayingSequence(false);
				break;

			case "sequence":
				this.context.setPlayingSequence(true);
				break;
		}
	}

	componentDidMount() {
		if (this.context.playingSequence)
			$('.nav-tabs a[href="#sequence"]').tab('show');

		else
			$('.nav-tabs a[href="#perform"]').tab('show');
	}

	render() {
		let song=this.context.getCurrentSong();

		return (
			<div class="card border-success">
				<div class="card-header">
					Chord
        		</div>
				<div class="card-body">
					<ul class="nav nav-tabs mb-3">
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#perform"
									onClick={this.onTabSelect.bind(this,"perform")}>
								Perform
							</a>
						</li>
						{<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#sequence"
									onClick={this.onTabSelect.bind(this,"sequence")}>
								Sequence
							</a>
						</li>}
					</ul>

					<div class="tab-content">
						<div class="tab-pane fade active show" id="perform">
							{this.context.getChordLabels().map((label,index)=>{
								let cls="btn btn-success mr-2 mb-2";

								if (index==this.context.currentChordIndex)
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
						{<div class="tab-pane fade" id="sequence">
							{song.chordSequence.map((chord,index)=>{
								return (
									<SequenceChord
											sequenceIndex={index}
											chord={chord}
											key={chord.key}/>
								)
							})}
							<button class="btn btn-light mb-2"
									style={{'width': '5em', 'height': '5em'}}
									onClick={this.onAddChordClick}>
								+
							</button>
						</div>}
					</div>
				</div>
			</div>
		);
	}
}