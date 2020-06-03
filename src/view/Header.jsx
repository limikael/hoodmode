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
		let items=[],rightItems=[];

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
				<div class="header-text">
					{ctx.getCurrentSong().name}
				</div>
			);

			rightItems.push(
				<A onPress={ctx.playClick}>
					<img class="icon" src="img/play-fill.svg"
							style={{"margin-left": "0.5rem"}}/>
				</A>
			);

			rightItems.push(
				<A onRelease={ctx.toggleSettings}>
					<img class="icon" src="img/gear-fill.svg"
							style={{"margin-left": "0.5rem"}}/>
				</A>
			);
		}
		else {
			items.push(
				<div class="header-text text-white">Hoodmode</div>
			);

			rightItems.push(
				<A onRelease={ctx.showAboutScreen}>
					<img class="icon" src="img/info-icon.svg"/>
				</A>
			);
		}


		return (
			<Box width="100%" height="4rem" bg="dark">
				{items}
				<Align parentPadding="bg" align="e"
						width="6rem" height="2rem"
						textAlign="right">
					{rightItems}
				</Align>
			</Box>
		);
	}
}