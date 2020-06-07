import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import A from './A.jsx';
import { Select, IF } from '../utils/ReactUtil.jsx';
import Box from '../utils/Box.jsx';
import Align from '../utils/Align.jsx';
import RemApp from '../utils/RemApp.jsx';

export default class Dialog extends Component {
	nlToBr(string) {
		return string.split('\n').map((item, index) => {
			return (index === 0) ? item : [<br key={index} />, item]
		})
	}

	render() {
		let ctx=useContext(StateStore.Context);

		let modalFunc=ctx.cancelDialog;
		if (typeof ctx.dialog.input !== "undefined")
			modalFunc=null;

		return (
			<Align modal onDismiss={modalFunc} width="16rem" height="16rem">
				<Box bg="background" border="dark" width="100%" height="100%">
					<div class="dialog-text">
						{this.nlToBr(ctx.dialog.text)}
					</div>

					{IF(typeof ctx.dialog.input !== "undefined",()=>[
						<div style={{height: "1rem"}}/>,
						<Box width="100%" height="4rem" border="black" bg="light">
							<input type="text"
								value={ctx.dialog.input}
								onChange={ctx.setDialogInput}/>
						</Box>
					])}

					<Align height="4rem" width="100%" align="se" textAlign="right"
							parentPadding="bg">
						{ctx.dialog.buttons.map((button)=>{
							let cls="box "+button.class;

							let f=ctx.cancelDialog;
							if (button.action)
								f=ctx[button.action];

							return (
								<Box bg={button.bg} height="4rem"
										onRelease={f}>
									<div class="button-label">{button.text}</div>
								</Box>
							);
						})}
					</Align>
				</Box>
			</Align>
		);
	}
}
