import MockInAppPurchase from '../utils/MockInAppPurchase.js';
import JsonUtil from '../utils/JsonUtil.js';

export default class StoreManager {
	constructor(state) {
		this.storeKey="hoodmode-premium";
		this.graceTime=1000*60*60*24*3;
		//this.graceTime=1000*60*10;

		this.state=state;
		this.products=[];
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

		this.restorePurchases().then(()=>{}).catch(()=>{});

		let jsonData=window.localStorage.getItem(this.storeKey);
		let data=JsonUtil.safeParse(jsonData);
		if (data && data.lastCheck && data.lastCheck+this.graceTime>Date.now())
			this.state.setPremiumState(true);
	}

	savePremium() {
		let data={
			lastCheck: Date.now()
		};

		window.localStorage.setItem(this.storeKey,JSON.stringify(data));
		this.state.setPremiumState(true);
	}

	async restorePurchases() {
		let data=await this.inAppPurchase.restorePurchases();
		if (data && data.length)
			this.savePremium();
	}

	async updateProducts() {
		this.products=await this.inAppPurchase.getProducts(this.productIds);
	}

	getProductById(productId) {
		for (let product of this.products)
			if (product.productId==productId)
				return product;

		return null;
	}

	async buyPremium(productId) {
		await this.inAppPurchase.subscribe(productId);
		this.savePremium();
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