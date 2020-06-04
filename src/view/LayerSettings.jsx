import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';
import RemApp from '../utils/RemApp.jsx';

export default class LayerSettings {
	render() {
		let ctx=useContext(AppContext);

		let instrument=ctx.getCurrentInstrument();
		let layer=ctx.getCurrentLayer();

		return (
			<Align modal
					width="18rem" height="18rem"
					onDismiss={ctx.toggleSettings}>
				<Box bg="dark" width="100%" height="100%">
					<div class="pane-header bg-dark text-secondary">LAYER SETTINGS</div>

					<Box width="100%">
						<img src={"img/"+instrument.icon} class="icon"
								style={{"margin-right": "0.5rem"}}/>
						<div class="header-label">{instrument.name}</div>
					</Box>

					<p class="input-label">Volume</p>
					<Box width="100%" bg="light" border="black" height="4rem">
						<input type="range" min="0" max="1" step="0.01"
							value={layer.volume}
							onChange={ctx.setCurrentLayerVolume}/>
					</Box>

					<Align height="4rem" width="100%" align="se" textAlign="right"
							parentPadding="bg">
						<Box width="4rem" height="4rem" bg="warning"
								onRelease={ctx.deleteCurrentLayer}>
							<img src="img/trash.svg" class="icon"/>
						</Box>
						<Box bg="primary" height="4rem"
								onRelease={ctx.toggleSettings}>
							<div class="button-label">Close</div>
						</Box>
					</Align>
				</Box>
			</Align>

/*			<div class="pane-container">
				<div class="box pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">LAYER SETTINGS</div>
					<div class="box w-4 el text-white">
						<img src={"img/"+instrument.icon}/>
						{instrument.name}
					</div>

					<br/><br/>

					<div class="input-group">
						Volume<br/>
						<div class="box border bg-white border-black text-black w-4">
							<input type="range" min="0" max="1" step="0.01"
								value={layer.volume}
								onChange={ctx.setCurrentLayerVolume}
							/>
						</div>
					</div>

					<div class="form-buttons">
						<A class="box bg-danger text-white"
								onRelease={ctx.deleteCurrentLayer}>
							<img src="img/trash.svg"/>
						</A>
						<A class="box bg-primary form-button text-white"
								onRelease={ctx.toggleSettings}>
							Close
						</A>
					</div>
				</div>
			</div>*/
		);
	}
}
