import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import { Select, IF } from '../utils/ReactUtil.jsx';
import A from './A.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';

export default class Header extends Component {
	render() {
		let ctx=useContext(AppContext);

		let playButtonClass="header-button text-white ";
		if (ctx.playing)
			playButtonClass+="active";

		let recordButtonClass="header-button text-white ";
		if (ctx.recording)
			recordButtonClass+="active";

		let items=[];
		if (ctx.isSongOpen()) {
			items.push(
				<A onRelease={ctx.goBack}>
					<img src="img/arrow-left.svg" class="icon" style={{"margin-right": "0.5rem"}}/>
				</A>
			);

			if (ctx.currentLayerIndex>=0)
				items.push(
					<img src={"img/"+ctx.getInstrumentIconByKey(ctx.getCurrentLayer().instrumentKey)}
							class="icon" style={{"margin-right": "0.5rem"}}/>
				);

			items.push(
				<div class="header-text text-white">
					{ctx.getCurrentSong().name}
				</div>
			);

			items.push(
				<A class={playButtonClass}
						onPress={ctx.playClick}>
					<img src="img/play-fill.svg"/>
				</A>
			);

			items.push(
				<A class="header-button text-white"
						onRelease={ctx.toggleSettings}>
					<img src="img/gear-fill.svg"/>
				</A>
			);
		}
		else {
			items.push(
				<div class="header-text text-white">Hoodmode</div>
			);

			items.push(
				<A class="header-button text-white"
					onRelease={ctx.showAboutScreen}>
					<img src="img/info-icon.svg"/>
				</A>
			);
		}


		return (
			<Box width="100%" height="4rem" bg="dark" border="white">
				{items}
				<Align left="0.7rem" top="0.7rem" bottom="0.7rem" right="0.7rem" align="e" width="4rem" height="2rem" debug>

				</Align>
			</Box>
		);
	}
}