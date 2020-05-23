import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';

export default class Front {
	render() {
		let ctx=useContext(AppContext);

		return (
			<div class="pane-container">
				<div class="box pane double border border-dark">
					<div class="pane-header text-secondary bg-dark">SONGS</div>

					<A class="text-white"
							onRelease={ctx.addSong}>
						<div class="box bg-dark w-1">+</div>
						<div class="box">New Song</div>
					</A>
					<div class="front-container">
						{ctx.songs.map((song,index)=>(
							<A class="box bg-secondary text-white w-4 border border-light el"
									onRelease={ctx.setSongIndex.bind(null,index)}
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
