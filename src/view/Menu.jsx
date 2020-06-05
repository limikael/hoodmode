import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import AppContext from '../utils/AppContext.js';
import Align from '../utils/Align.jsx';
import Box from '../utils/Box.jsx';
import A from '../view/A.jsx';

export default class Menu extends Component {
	onMenuClick=(i)=>{
		let ctx=useContext(AppContext);

		ctx.toggleMenu();
		this.menuItems[i].func();
	}

	render() {
		let ctx=useContext(AppContext);
		this.menuItems=[];

		if (ctx.isLayerOpen()) {
			this.menuItems.push({
				sep: "LAYER"
			});

			this.menuItems.push({
				label: "Layer Settings",
				func: ctx.toggleSettings
			});

			this.menuItems.push({
				label: "Delete Layer",
				func: ctx.deleteCurrentLayer
			});
		}

		else if (ctx.isSongOpen()) {
			this.menuItems.push({
				sep: "SONG"
			});

			this.menuItems.push({
				label: "Song Settings",
				func: ctx.toggleSettings
			});

			this.menuItems.push({
				label: "Delete Song",
				func: ctx.deleteCurrentSong
			});
		}

		this.menuItems.push({
			sep: "QORD"
		});

		this.menuItems.push({
			label: "About Qord",
			func: ctx.showAboutScreen
		});

		this.menuItems.push({
			label: "Pro Version",
			func: ctx.goPro
		});

		let renderedMenuItems=[];
		for (let i in this.menuItems) {
			let menuItem=this.menuItems[i];

			if (menuItem.sep)
				renderedMenuItems.push(
					<div class="menu-separator">{menuItem.sep}</div>
				);

			else
				renderedMenuItems.push(
					<A onRelease={this.onMenuClick.bind(this,i)}>
						<div class="menu-item">
							{menuItem.label}
						</div>
					</A>
				);
		}

		let menuHeight=(2+renderedMenuItems.length*2)+"rem";

		return (
			<Align modal onDismiss={ctx.toggleMenu} width="16rem" height={menuHeight}
					align="ne" top="3rem" right="1rem">
				<Box bg="light" border="black" width="100%" height="100%">
					{renderedMenuItems}
				</Box>
			</Align>
		);
	}
}
