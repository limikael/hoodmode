import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';
import RemApp from '../utils/RemApp.jsx';

export default class Front {
	render() {
		let ctx=useContext(AppContext);
		let vctx=useContext(RemApp.Context);

		let itemWidth="100%";
		if (vctx.orientation=="landscape")
			itemWidth="50%";

		return (
			<Box width="100%" height="100%" border="dark">
				{/*<div class="pane-header text-secondary bg-dark">SONGS</div>*/}

				<Box bg="dark" width="4rem" height="4rem"
						onRelease={ctx.addSong}
						class="button-label">
					+
				</Box>
				<Box height="4rem">
					<div class="button-label-small">New Song</div>
				</Box>
				<Align parentPadding="border" width="100%" height="100%" top="4rem">
					{ctx.songs.map((song,index)=>(
						<Box width={itemWidth} height="4rem" border="light" bg="secondary"
								onRelease={ctx.setSongIndex.bind(null,index)}>
							<h1>{song.name}</h1>
						</Box>
					))}
				</Align>
			</Box>
		);
	}
}
