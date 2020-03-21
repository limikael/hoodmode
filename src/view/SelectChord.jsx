import { h, Component } from 'preact';
import A from './A.jsx';

export default class SelectChord {
	render() {
		let song=this.context.getCurrentSong();
		let section=song.sections[this.context.currentSectionIndex];
		let currentChordIndex=section[this.context.editSectionChordVisible];

		return (
			<div class="modal-container" onClick={this.context.hideEditSectionChord}>
				<div class="box border border-dark bg-background select-chord">
					<div class="pane-header text-secondary bg-dark ">EDIT CHORD</div>
					<hr class="pane-divider four"/>
					<div>
						{this.context.getChordLabels().map((label, index)=>{
							let cls="box w-1 bg-success text-light chord ";
							if (index==currentChordIndex)
								cls+="active";

							return (
								<A class={cls}
										onRelease={this.context.editSectionChord.bind(null,index)}>
									{label}
								</A>
							)
						})}
					</div>
					<A class="box bg-danger w-1 text-white"
							href="#"
							onRelease={this.context.removeSectionChord}>
						<img src="img/trash.svg"/>
					</A>
				</div>
			</div>
		);
	}
}
