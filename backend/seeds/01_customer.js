/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcryptjs");


exports.seed = async function (knex) {
	// Deletes ALL existing entries

	const password = await bcrypt.hash("admin123", 10);
	await knex("customer").del();
	await knex("customer").insert([
		{
			id: 1,
			first_name: "Jukka",
			last_name: "Jokunen",
			address: "Katu 1",
			postcode: 33100,
			city: "tampere",
			email: "jukka.jokunen@gmail.com",
			phone: "123456789",
		},
		{
			id: 2,
			first_name: "Matti",
			last_name: "Meikäläinen",
			address: "Katu 2",
			postcode: 33100,
			city: "tampere",
			email: "matti.meikalainen@gmail.com",
			phone: "987654321",
		},
		{
			id: 3,
			first_name: "Maija",
			last_name: "Meikäläinen",
			address: "Katu 3",
			postcode: 33100,
			city: "tampere",
			email: "maija.meikäläinen@gmail.com",
			phone: "123456789",
		},
		{
			id: 4,
			first_name: "Admin123",
			last_name: "Admin123",
			address: "Katu 3",
			postcode: 33100,
			city: "tampere",
			email: "Admin123@gmail.com",
			phone: "123456789",
			username: "Admin123",
			password: password,
		},
	]);
};
