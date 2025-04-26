/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("order", (table) => {
			table.increments("id").primary();
			table
				.integer("customer_id")
				.unsigned()
				.references("id")
				.inTable("customer")
				.notNull()
				.onDelete("CASCADE");
			table.string("status", 100).notNullable();
			table.timestamps(true, true);
		})
		.createTable("ordered_product", (table) => {
			table.increments("id").primary();
			table
				.integer("order_id")
				.unsigned()
				.references("id")
				.inTable("order")
				.notNull()
				.onDelete("CASCADE");
			table
				.integer("product_stock_id")
				.unsigned()
				.references("id")
				.inTable("product_stock")
				.onDelete("CASCADE");
			table
				.integer("product_id")
				.unsigned()
				.references("id")
				.inTable("product")
				.notNull()
				.onDelete("CASCADE");
			table.integer("quantity").notNullable();
			table.timestamps(true, true);
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("ordered_product").dropTable("order")
};
