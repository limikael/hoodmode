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

		}];
	}

	async subscribe(productId) {
		console.log("mock subscribe");
	}
}