import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';

export default class Dialog extends Component {
	nlToBr(string) {
		return string.split('\n').map((item, index) => {
			return (index === 0) ? item : [<br key={index} />, item]
		})
	}

	render() {
		let ctx=useContext(AppContext);

		let modalFunc=ctx.cancelDialog;
		if (typeof ctx.dialog.input !== "undefined")
			modalFunc=null;

		return (
			<div class="modal-container"
					onMouseUp={modalFunc} onTouchEnd={modalFunc}>
				<div class="box border border-dark bg-background dialog">
					{this.nlToBr(ctx.dialog.text)}

					{IF(typeof ctx.dialog.input !== "undefined",()=>
						<div class="box border full border-black bg-white"
								style={{"margin-top": "0.5em"}}>
							<input type="text"
								value={ctx.dialog.input}
								onChange={ctx.setDialogInput}/>
						</div>
					)}

					<div class="form-buttons">
						{ctx.dialog.buttons.map((button)=>{
							let cls="box "+button.class;

							let f=ctx.cancelDialog;
							if (button.action)
								f=ctx[button.action];

							return (
								<A class={cls}
										onRelease={f}>
									{button.text}
								</A>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}
