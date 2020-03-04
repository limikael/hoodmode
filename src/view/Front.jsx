import { h, Component } from 'preact';

export default class Front {
	render() {
		return (
			<div class="pane-container">
				<div class="box pane double border border-dark">
					<div class="pane-header text-secondary bg-dark">SONGS</div>

					<a href="#" class="text-white"
							onClick={this.context.addSong}>
						<div class="box bg-dark w-1">+</div>
						<div class="box">New Song</div>
					</a><br/>
					{this.context.songs.map((song,index)=>(
						<a class="box bg-secondary text-white w-4 border border-light"
								href="#"
								onClick={this.context.setSongIndex.bind(null,index)}>
							{song.name}
						</a>
					))}
				</div>
			</div>
		);
	}
}
