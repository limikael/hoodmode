import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import TactAlign from '../utils/TactAlign.jsx';
import TactBox from '../utils/TactBox.jsx';

export default class Front {
	render() {
		let ctx=useContext(AppContext);

		return (
/*			<div class="pane-container">
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
			</div>*/

			<TactBox pw="18" ph="36" lw="36" lh="18" brd="dark">
				<TactBox w="4" h="4" tx="white" bg="dark" center onRelease={ctx.addSong}>+</TactBox>
				<TactAlign left="4" a="nw" h="4" w="100%">
					<TactBox w="100%" h="4" tx="white">New Song</TactBox>
				</TactAlign>
				<TactAlign top="4" h="100%" w="100%">
					{ctx.songs.map((song,index)=>(
						<TactBox pw="100%" lw="50%" h="4" brd="light" tx="white" bg="secondary"
								onRelease={ctx.setSongIndex.bind(null,index)}
								cancelOnMove={true}>
							{song.name}
						</TactBox>
					))}
				</TactAlign>
			</TactBox>
		);
	}
}
