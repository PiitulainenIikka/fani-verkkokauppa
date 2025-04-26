/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("customer", (table) => {
			table.increments("id").primary();
			table.string("first_name", 100).notNullable();
			table.string("last_name", 100).notNullable();
			table.string("address", 100).notNullable();
			table.string("postcode", 100).notNullable();
			table.string("city", 100).notNullable();
			table.string("email", 100).notNullable();
			table.string("phone", 100).notNullable();
			table.string("username", 100).unique().nullable()
			table.string("password", 255).nullable()
			table.timestamps(true, true);
		})
		.createTable("product", (table) => {
			table.increments("id").primary();
			table.string("name", 100).notNullable();
			table.string("description", 500).notNullable();
			table.string("imageName", 100).notNullable();
			table.string("price", 100).notNullable();
			table.boolean("sizeable").notNullable();
			table.timestamps(true, true);
		})
		.createTable("product_stock", (table) => {
			table.increments("id").primary();
			table
				.integer("product_id")
				.unsigned()
				.references("id")
				.inTable("product")
				.notNull()
				.onDelete("CASCADE");
			table.integer("stock").notNullable();
			table.enum("size", ["XXS", "XS", "S", "M", "L", "XL", "XXL"]).defaultTo(null);
			table.timestamps(true, true);
		})
		.createTable("cart_item", (table) => {
			table.increments("id").primary();
			table
				.integer("customer_id")
				.unsigned()
				.references("id")
				.inTable("customer")
				.notNullable()
				.onDelete("CASCADE");
			table
				.integer("product_stock_id")
				.unsigned()
				.references("id")
				.inTable("product_stock")
				.onDelete("CASCADE");
			table.integer("quantity").notNullable();
			table
				.integer("product_id")
				.unsigned()
				.references("id")
				.inTable("product")
				.notNull()
				.onDelete("CASCADE");
			table.timestamps(true, true);
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("cart_item")
		.dropTableIfExists("product_stock")
		.dropTableIfExists("customer")
		.dropTableIfExists("product");
};
