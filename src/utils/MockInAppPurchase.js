export default class MockInAppPurchase {
	async restorePurchases() {
		return [];
	}

	async getProducts(productIds) {
		console.log("mock getProducts");
	}

	async subscribe(productId) {
		console.log("mock subscribe");
	}
}