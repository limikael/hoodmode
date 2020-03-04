import { h, Component } from 'preact';
import SelectChord from './SelectChord.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class SongChords extends Component {
	renderConductorChords() {
		return this.context.getChordLabels().map((label, index)=>{
			let cls="box w-1 bg-success text-light chord ";
			if (index==this.context.currentChordIndex)
				cls+=" active beat-0 beat-4 beat-8 beat-12";

			return (
				<a class={cls}
						href="#"
						onClick={this.context.setCurrentChordIndex.bind(null,index)}>
					{label}
				</a>
			)
		});
	}

	renderSectionChords() {
		let a=this.context.getCurrentSectionChordLabels().map((label, index)=>{
			let cls="box w-1 bg-success text-light section-chord sequence-"+index;

			return (
				<a class={cls}
						href="#"
						onClick={this.context.showEditSectionChord.bind(null,index)}>
					{label}
				</a>
			);
		});

		a.push(
			<a class="box border border-white text-white w-1"
					href="#"
					onClick={this.context.addSectionChord}>
				+
			</a>
		);

		return a;
	}

	render() {
		let song=this.context.getCurrentSong();

		let chordLabels;
		if (this.context.currentSectionIndex==-1)
			chordLabels=this.renderConductorChords();

		else
			chordLabels=this.renderSectionChords();

		return (
			<div class="pane box border border-dark">
				<hr class="pane-divider"/>
				<div class="pane-header text-secondary bg-dark ">CHORDS</div>
				<div style={{height: '6em'}}>{chordLabels}</div>
				<a class={"box w-1 bg-secondary text-white "+
							((this.context.currentSectionIndex==-1)?"active":"")}
						href="#"
						onClick={this.context.setCurrentSectionIndex.bind(null,-1)}>
					<img src="img/conductor.svg"/>
				</a>
				{["A","B","C"].map((letter, index)=>{
					let cls="box w-1 bg-primary text-white ";
					if (index==this.context.currentSectionIndex)
						cls+="active";

					return (
						<a class={cls}
								href="#"
								onClick={this.context.setCurrentSectionIndex.bind(null,index)}>
							{letter}
						</a>
					);
				})}
				{IF(this.context.editSectionChordVisible>=0,()=>
					<SelectChord />
				)}
			</div>
		);
	}
}
