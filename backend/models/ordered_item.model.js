const createOrderedItem = (db, OrderedProducts) => {
	return db("ordered_product").insert(OrderedProducts);
};


module.exports = {
	createOrderedItem,
};
