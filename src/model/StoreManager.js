import MockInAppPurchase from '../utils/MockInAppPurchase.js';
import JsonUtil from '../utils/JsonUtil.js';

export default class StoreManager {
	constructor(state) {
		this.storeKey="hoodmode-premium";
		this.graceTime=1000*60*60*24*3;
		//this.graceTime=1000*60*10;

		this.state=state;
	}

	updateState() {}

	init(premiumCodes) {
		if (window.hasOwnProperty("cordova"))
			this.inAppPurchase=window.inAppPurchase;

		else
			this.inAppPurchase=new MockInAppPurchase();

		this.productIds=['qord_premium_test'];
		for (let premiumCode of premiumCodes)
			this.productIds.push("premium_"+premiumCode);

		this.inAppPurchase.restorePurchases()
			.then((data)=>{
				if (data.length)
					this.savePremium();
			})
			.catch((e)=>{
			});

		let jsonData=window.localStorage.getItem(this.storeKey);
		let data=JsonUtil.safeParse(jsonData);

		/*console.log("now: "+Date.now());
		console.log("lst: "+data.lastCheck);*/

		if (data && data.lastCheck && data.lastCheck+this.graceTime>Date.now())
			this.state.setPremiumState("premium");
	}

	savePremium() {
		let data={
			lastCheck: Date.now()
		};

		window.localStorage.setItem(this.storeKey,JSON.stringify(data));
		this.state.setPremiumState("premium");
	}

	async buyPremium(code) {
		this.state.setPremiumState("pending");

		let productId="qord_premium_test";
		if (code)
			productId="premium_"+code;

		try {
			let data=await this.inAppPurchase.restorePurchases();
			if (data && data.length) {
				this.savePremium();
				return;
			}

			let products=await this.inAppPurchase.getProducts(this.productIds);
			await this.inAppPurchase.subscribe(productId);
			this.savePremium();
		}

		catch (err) {
			this.state.setPremiumState("basic");
		}
	}

	manageSubscriptions() {
		let url="http://asdf.com/";

		if (window.cordova) {
			if (window.cordova.platformId=="android")
				url="http://play.google.com/store/account/subscriptions";

			if (window.cordova.platformId=="ios")
				url="https://apps.apple.com/account/subscriptions";

			window.cordova.InAppBrowser.open(url,"_system");
		}

		else {
			window.open(url,"_system");
		}
	}
}