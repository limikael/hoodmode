import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import SelectChord from './SelectChord.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';

export default class SongChords extends Component {
	renderConductorChords() {
		let ctx=useContext(AppContext);

		return ctx.getChordLabels().map((label, index)=>{
			let cls="box w-1 bg-success text-light chord ";
			if (index==ctx.currentChordIndex)
				cls+=" active beat-0 beat-4 beat-8 beat-12";

			return (
				<A class={cls}
						onPress={ctx.setCurrentChordIndex.bind(null,index)}>
					{label}
				</A>
			)
		});
	}

	renderSectionChords() {
		let ctx=useContext(AppContext);

		let a=ctx.getCurrentSectionChordLabels().map((label, index)=>{
			let cls="box w-1 bg-success text-light section-chord sequence-"+index;

			return (
				<A class={cls}
						onRelease={ctx.showEditSectionChord.bind(null,index)}>
					{label}
				</A>
			);
		});

		a.push(
			<A class="box border border-white text-white w-1"
					onRelease={ctx.addSectionChord}>
				+
			</A>
		);

		return a;
	}

	render() {
		let ctx=useContext(AppContext);
		let song=ctx.getCurrentSong();

		let chordLabels;
		if (ctx.currentSectionIndex==-1)
			chordLabels=this.renderConductorChords();

		else
			chordLabels=this.renderSectionChords();

		return (
			<div class="pane box border border-dark">
				<hr class="pane-divider"/>
				<div class="pane-header text-secondary bg-dark ">CHORDS</div>
				<div style={{height: '6em'}}>{chordLabels}</div>
				<A class={"box w-1 bg-secondary text-white "+
							((ctx.currentSectionIndex==-1)?"active":"")}
						onPress={ctx.setCurrentSectionIndex.bind(null,-1)}>
					<img src="img/conductor.svg"/>
				</A>
				{["A","B","C"].map((letter, index)=>{
					let cls="box w-1 bg-primary text-white ";
					if (index==ctx.currentSectionIndex)
						cls+="active";

					return (
						<A class={cls}
								onPress={ctx.setCurrentSectionIndex.bind(null,index)}>
							{letter}
						</A>
					);
				})}
				{IF(ctx.editSectionChordVisible>=0,()=>
					<SelectChord />
				)}
			</div>
		);
	}
}
