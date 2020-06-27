import AsyncUtil from '../utils/AsyncUtil.js';

export default class MockInAppPurchase {
	async restorePurchases() {
		await AsyncUtil.sleep(1000);
		//throw new Error("network error");
		return [];
	}

	async getProducts(productIds) {
		await AsyncUtil.sleep(1000);
		return [{
			productId: "qord_premium_test",
			title: "Pro version (Chordic)",
			description: "Create an unlimited number of songs",
			price: "24,00 kr"
		}];
	}

	async subscribe(productId) {
		await AsyncUtil.sleep(1000);
		throw new Error("bla");
	}
}