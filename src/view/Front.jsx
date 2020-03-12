import { h, Component } from 'preact';
import A from './A.jsx';

export default class Front {
	render() {
		return (
			<div class="pane-container">
				<div class="box pane double border border-dark">
					<div class="pane-header text-secondary bg-dark">SONGS</div>

					<A class="text-white"
							onClick={this.context.addSong}>
						<div class="box bg-dark w-1">+</div>
						<div class="box">New Song</div>
					</A><br/>
					{this.context.songs.map((song,index)=>(
						<A class="box bg-secondary text-white w-4 border border-light"
								onClick={this.context.setSongIndex.bind(null,index)}>
							{song.name}
						</A>
					))}
				</div>
			</div>
		);
	}
}
