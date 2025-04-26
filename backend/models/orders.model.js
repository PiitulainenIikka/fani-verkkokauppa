const createOrder = (db, order) => {
	return db("order").insert(order);
};

const getOrderData = (db, order_id) => {
	return db("order")
		.where("order.id", order_id)
		.join("ordered_product", "order.id", "ordered_product.order_id")
		.join("product", "ordered_product.product_id", "product.id")
		.select(
			"order.id as order_id",
			"order.status",
			"ordered_product.quantity",
			"product.name",
			"product.price",
            "product.imageName"
		);
};
const getOrdersForCustomer = (db, customer_id) => {
	return db("order").where("customer_id", customer_id);
};
module.exports = {
	createOrder,
	getOrderData,
	getOrdersForCustomer,
};
