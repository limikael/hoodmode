export default class AppController {
	constructor(storeManager) {
		this.storeManager=storeManager;
	}

	setPremiumState(state, premiumState) {
		state.premium=premiumState;
	}

	async premiumClicked(state) {
		state.cancelDialog();

		try {
			await this.storeManager.restorePurchases();
			if (state.premium)
				return;

			await this.storeManager.updateProducts();
			state.showPremiumPrompt();
		}

		catch (e) {
			console.log(e);
			state.alert(
				"Unfortunately there was a problem while enabling your subscription.\n\n"+
				"Please try again later!"
			);
		}
	}

	showPremiumPrompt(state, code) {
		let product=this.storeManager.getProductById("qord_premium_test");
		state.dialog={
			title: product.title,
			text:
				product.description+"\n\n"+
				"Reccuring subscription, "+product.price+" per month.",

			productId: "qord_premium_test",

			buttons: [{
				bg: 'danger',
				text: 'Subscribe',
				action: 'buyPremium'
			}/*,{
				bg: 'info',
				text: "Enter code",
				action: 'premiumCodeClicked'
			}*/]
		};

		if (code) {
			product=this.storeManager.getProductById("premium_"+code);
			state.dialog={
				title: product.title,
				text: product.description,
				fine: "First 30 days free, then "+product.price+" per month.",
				productId: "premium_"+code,

				buttons: [{
					bg: 'danger',
					text: 'Start Trial',
					action: 'buyPremium'
				}]
			};
		}
	}

	premiumCodeClicked(state) {
		state.dialog={
			text:
				"Please enter the your pro code to redeem your pro version offer!",

			input: "",
			buttons: [{
				bg: 'danger',
				text: 'Pro',
				action: 'premiumCodeEntered'
			}]
		};

		return state;
	}

	async restorePurchasesClicked(state) {
		try {
			await this.storeManager.restorePurchases();

			if (state.premium)
				state.alert(
					"Welcome as a pro user, and thank you very much for your confidence!\n\n"+
					"If there is anything I can do, please reach out!"
				);

			else
				state.alert(
					"There are no purchases to restore."
				);
		}

		catch (e) {
			console.log(e);
			state.alert(
				"Unfortunately there was a problem while restoring your purchases.\n\n"+
				"Please try again later!"
			);
		}
	}

	async buyPremium(state) {
		let productId=state.dialog.productId;
		state.cancelDialog();

		try {
			await this.storeManager.buyPremium(productId);
			state.alert(
				"Welcome as a pro user, and thank you very much for your confidence!\n\n"+
				"If there is anything I can do, please reach out!"
			);
		}

		catch (e) {
			console.log(e);
			state.alert(
				"Unfortunately there was a problem while enabling your subscription.\n\n"+
				"Please try again later!"
			);
		}
	}

	premiumCodeEntered(state) {
		let code=String(state.dialog.input).toLowerCase();
		state.cancelDialog();

		if (state.premiumCodes.includes(code) &&
				this.storeManager.getProductById("premium_"+code)) {
			state.showPremiumPrompt(code);
		}

		else {
			state.dialog={
				text: "This pro code is not recognized.",
				buttons: [{
					bg: "info",
					text: "Ok"
				}]
			}
		}
	}

	manageSubscriptionsClicked(state) {
		this.storeManager.manageSubscriptions();
	}
}