const ordermodels = require('../models/orders.model');
const cartItemModels = require('../models/cartItem.model');
const ordered_itemModels = require('../models/ordered_item.model');
const customerModels = require('../models/customer.model');
const productModels = require('../models/product.model');
const { getAuthId } = require('../middleware/auth');

const createOrder = (req, res) => {
	const db = req.app.get('db');
	const { customer, products } = req.body;
	const auth_id = getAuthId(req)

	if (auth_id) {
		const order = {
			customer_id: auth_id,
			status: 'pending',
		};
		ordermodels.createOrder(db, order)
			.then((order) => {
				const ordered_items = products.map((product) => {
					productModels.reduceStockQuantity(db, product.size_id, product.quantity)		
						.then(() => {})
					return {
						quantity: product.quantity,
						product_id: product.product_id,
						order_id: order[0],
						product_stock_id: product.size_id
					};
				});
				ordered_itemModels.createOrderedItem(db, ordered_items)
					.then(() => {
						const order_id = order[0];
						ordermodels.getOrderData(db, order_id)
							.then((data) => { 
								res.status(201).json(
									data
								);
							})
					})
			})
	} else {
		customerModels.createCustomer(db, customer)
			.then((customer) => {
				const customer_id = customer[0];
				const order = {
					customer_id,
					status: 'pending',
				};
				ordermodels.createOrder(db, order)
					.then((order) => {
						const ordered_items = products.map((product) => {
							productModels.reduceStockQuantity(db, product.size_id, product.quantity)
								.then(() => {})
							return {
								quantity: product.quantity,
								product_id: product.product_id,
								order_id: order[0]
							};
						});
						ordered_itemModels.createOrderedItem(db, ordered_items)
							.then(() => {
								const order_id = order[0];
								ordermodels.getOrderData(db, order_id)
									.then((data) => {
										res.status(201).json(
											data
										);
									})
							})
					})
			})
	}
}
const getOrders = (req, res) => {
	const db = req.app.get("db");
	const authid = getAuthId(req);
	ordermodels.getOrdersForCustomer(db, authid).then((orders) => {
		if (orders.length === 0) return res.status(200).json([]);

		const order = orders.map(async (order) => {
			return ordermodels.getOrderData(db, order.id).then((data) => {
				return {
					...order,
					ordered_items: data,
				};
			});
		});

		Promise.all(order).then((data) => {
			res.status(200).json(data);
		});
	});
};


module.exports = {
	createOrder,
	getOrders
} 