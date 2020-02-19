import { h, Component } from 'preact';

export default class Front {
	render() {
		return (
			<div class="pane-container">
				<div class="double-pane">
					<div class="double-pane-inner">
						<div class="pane-header">SONGS</div>

						<a class="table-row" href="#">+ New Song</a>
						{this.context.songs.map((song,index)=>(
							<a class="table-row success"
									href="#"
									onClick={this.context.setSongIndex.bind(null,index)}>
								{song.name}
							</a>
						))}
					</div>
				</div>
			</div>
		);
	}
}
