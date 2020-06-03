import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import Box from '../utils/Box.jsx';

export default class Front {
	render() {
		let ctx=useContext(AppContext);

		return (
			<Box width="100%" height="100%" border="dark">
				{/*<div class="pane-header text-secondary bg-dark">SONGS</div>*/}

				<A class="text-white"
						onRelease={ctx.addSong}>
					<div class="box bg-dark w-1">+</div>
					<div class="box">New Song</div>
				</A>
				{ctx.songs.map((song,index)=>(
					<Box width="100%" height="4rem" border="light" bg="secondary"
							onRelease={ctx.setSongIndex.bind(null,index)}>
						<h1>{song.name}</h1>
					</Box>
					/*<A class="box bg-secondary text-white w-4 border border-light el"
							onRelease={ctx.setSongIndex.bind(null,index)}
							cancelOnMove={true}>
						{song.name}
					</A>*/
				))}
			</Box>
		);
	}
}
