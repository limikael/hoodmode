import AsyncUtil from '../utils/AsyncUtil.js';

export default class MockInAppPurchase {
	async restorePurchases() {
		await AsyncUtil.sleep(100);
		//throw new Error("network error");
		return [];
	}

	async getProducts(productIds) {
		await AsyncUtil.sleep(100);
		return [{
			productId: "qord_premium_test",
			title: "Pro Version (Chordic)",
			description: "You can create unlimited songs with the pro version!",
			price: "$1.49"
//			price: "IDR 23,000"
		},{
			productId: "premium_ownh",
			title: "Pro Version (Chordic)",
			description: "First month free courtesy of Dea Reztika.",
			price: "24,00 kr"
		}];
	}

	async subscribe(productId) {
		console.log("subscribing: "+productId);
		await AsyncUtil.sleep(100);
		//throw new Error("bla");
	}
}