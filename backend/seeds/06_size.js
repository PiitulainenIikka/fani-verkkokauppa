/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("product_stock").del();
	await knex("product_stock").insert([
		{ id: 1, product_id: 1, stock: 40, size: "S" },
		{ id: 2, product_id: 2, stock: 30 },
		{ id: 3, product_id: 3, stock: 20 },
		{ id: 4, product_id: 4, stock: 10, size: "M" },
		{ id: 5, product_id: 5, stock: 10, size: "L" },
		{ id: 6, product_id: 6, stock: 10, size: "XL" },
		{ id: 7, product_id: 1, stock: 40, size: "M" },
	]);
};
