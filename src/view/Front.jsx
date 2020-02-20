import { h, Component } from 'preact';

export default class Front {
	render() {
		return (
			<div class="pane-container">
				<div class="pane double border border-dark">
					<div class="pane-header text-secondary bg-dark">SONGS</div>

					<a class="table-row text-light full-width" href="#"
							onClick={this.context.addSong}>
						+ New Song
					</a>
					{this.context.songs.map((song,index)=>(
						<a class="table-row table-row-border bg-success text-white"
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
