import { h, Component } from 'preact';
import { useContext } from 'preact/compat';
import StateStore from '../utils/StateStore.jsx';
import Align from '../utils/Align.jsx';
import Box from '../utils/Box.jsx';
import A from '../view/A.jsx';

export default class Menu extends Component {
	onMenuClick=(i)=>{
		let ctx=useContext(StateStore.Context);

		ctx.toggleMenu();

		if (this.menuItems[i].func)
			this.menuItems[i].func();
	}

	render() {
		let ctx=useContext(StateStore.Context);
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
			sep: "CHORDIC"
		});

		this.menuItems.push({
			label: "Howto Chordic",
			func: ctx.showTutorial
		});

		this.menuItems.push({
			label: "About Chordic",
			func: ctx.showAboutScreen
		});

		switch (ctx.premiumState) {
			case "basic":
				this.menuItems.push({
					label: "Get Pro version",
					func: ctx.premiumClicked
				});

				this.menuItems.push({
					label: "Enter Pro code",
					func: ctx.premiumCodeClicked
				});
				break;

			case "pending":
				this.menuItems.push({
					label: "Pro pending..."
				});
				break;

			case "premium":
				this.menuItems.push({
					label: "Manage Subscription",
					func: ctx.manageSubscriptionsClicked
				});
				break;
		}

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
