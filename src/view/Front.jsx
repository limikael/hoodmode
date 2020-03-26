import { h, Component } from 'preact';
import A from './A.jsx';

export default class Front {
	render() {
		return (
			<div class="pane-container">
				<div class="box pane double border border-dark">
					<div class="pane-header text-secondary bg-dark">SONGS</div>

					<A class="text-white"
							onRelease={this.context.addSong}>
						<div class="box bg-dark w-1">+</div>
						<div class="box">New Song</div>
					</A>
					<div class="front-container">
						{this.context.songs.map((song,index)=>(
							<A class="box bg-secondary text-white w-4 border border-light el"
									onRelease={this.context.setSongIndex.bind(null,index)}
									cancelOnMove={true}>
								{song.name}
							</A>
						))}
					</div>
				</div>
			</div>
		);
	}
}
