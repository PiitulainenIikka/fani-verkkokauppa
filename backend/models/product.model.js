const getAllProducts = (db) => {
	return db.select("*").from("product");
};
const getProductById = (db, id) => {
	return db.select("*").from("product").where("id", id);
};
const createProduct = (db, product) => {
	return db("product").insert(product);
};
const updateProduct = (db, id, product) => {
	return db("product").where("id", id).update(product);
};
const deleteProduct = (db, id) => {
	return db("product").where("id", id).del();
};
const getRandomProducts = (db) => {
	return db.select("*").from("product").orderByRaw("RAND()").limit(10);
};
const getProductStockById = (db, id) => {
	return db.select("*").from("product_stock").where("product_id", id);
};
const reduceStockQuantity = (db, product_stock_id, quantity) => {
	return db("product_stock").where("id", product_stock_id).decrement("stock", quantity);
};
const searchProducts = (db, search) => {
	return db("product").where("name", "like", `%${search}%`).limit(5);
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	getRandomProducts,
	getProductStockById,
	reduceStockQuantity,
	searchProducts
};
