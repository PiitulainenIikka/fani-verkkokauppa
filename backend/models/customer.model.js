const createCustomer = (db, customer) => {
	return db.from("customer").insert(customer);
};
const getCustomerByUsername = (db, username) => {
	return db.from("customer").where("username", username).first();
};
const getCustomerById = (db, id) => {
	return db
		.from("customer")
		.select("first_name", "last_name", "address", "postcode", "email", "phone", "city")
		.where("id", id)
		.first();
};
const updateCustomer = (
	db,
	id,
	first_name,
	last_name,
	address,
	postcode,
	city,
	email,
	phone
) => {
	return db.from("customer").where("id", id).update({
		first_name,
		last_name,
		address,
		postcode,
		city,
		email,
		phone,
	});
};

module.exports = {
	createCustomer,
	getCustomerByUsername,
	getCustomerById,
	updateCustomer,
};
