export default class StoreManager {
	constructor(state) {
		this.state=state;
	}

	updateState() {}

	async init(premiumCodes) {
		let codes=['qord_premium_test'];
		for (let premiumCode of premiumCodes)
			codes.push("premium_"+premiumCode);

//		let products=await window.inAppPurchase.getProducts(codes);
		let data=await window.inAppPurchase.restorePurchases();

		if (data.length>0)
			this.state.setPremiumState("premium");
	}

	manageSubscriptions() {
		let url="http://asdf.com/";

		if (window.cordova) {
			if (window.cordova.platformId=="android")
				url="http://play.google.com/store/account/subscriptions";

			if (window.cordova.platformId=="ios")
				url="https://apps.apple.com/account/subscriptions";
		}

		window.open(url,"_system");
	}

	buyPremium(code) {
		this.state.setPremiumState("pending");

		let productId="qord_premium_test";
		if (code)
			productId="premium_"+code;

		window.inAppPurchase.subscribe(productId)
			.then((data)=>{
				this.state.setPremiumState("premium");
			})
			.catch((err)=>{
				this.state.setPremiumState("basic");
			});
	}
}