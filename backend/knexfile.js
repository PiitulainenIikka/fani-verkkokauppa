// Update with your config settings.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
	development: {
		PORT: process.env.PORT || 3000,
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT,
		},
	},
	production: {
		PORT: process.env.PORT || 3000,
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT,
		},
	},
};
