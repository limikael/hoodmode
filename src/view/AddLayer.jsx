import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';

export default class AddLayer {
	render() {
		let ctx=useContext(AppContext);

		return (
			<div class="pane-container">
				<div class="box pane double bg-dark">
					<div class="pane-header bg-dark text-secondary">ADD LAYER</div>
					{ctx.instruments.map((instrument,index)=>(
						<A class="box w-4 text-white bg-danger el"
								onRelease={ctx.addLayer.bind(null,instrument.key)}>
							<img src={"img/"+instrument.icon}/>
							{instrument.name}
						</A>
					))}
				</div>
			</div>
		);
	}
}
