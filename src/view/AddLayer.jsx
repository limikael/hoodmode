import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import Align from '../utils/Align.jsx';
import Box from '../utils/Box.jsx';
import RemApp from '../utils/RemApp.jsx';

export default class AddLayer {
	render() {
		let ctx=useContext(AppContext);
		let vctx=useContext(RemApp.Context);

		let itemWidth="100%";
		if (vctx.orientation=="landscape")
			itemWidth="50%";

		return (
			<Align portraitWidth="18rem" portraitHeight="36rem"
					landscapeWidth="36rem" landscapeHeight="18rem" modal
					onDismiss={ctx.hideAddLayer}>
				<Box width="100%" height="100%" border="dark" bg="background">
					<div class="pane-header text-secondary bg-dark">ADD LAYER</div>
					{ctx.instruments.map((instrument,index)=>(
						<Box height="4rem" width={itemWidth} bg="danger"
								onRelease={ctx.addLayer.bind(null,instrument.key)}>
							<img src={"img/"+instrument.icon} class="icon"
									style={{"margin-right": "0.5rem"}}/>
							<Align left="2.5rem" width="100%" height="2rem"
									parentPadding="bg">
								<div class="header-label">{instrument.name}</div>
							</Align>
						</Box>
					))}
				</Box>
			</Align>
		);
	}
}
