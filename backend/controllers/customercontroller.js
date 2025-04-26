const customerModels = require("../models/customer.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const logincontroller = (req, res) => {
	const { customer } = req.body;
	const db = req.app.get("db");

	customerModels
		.getCustomerByUsername(db, customer.username)
		.then((user) => {
			bcrypt
				.compare(customer.password, user.password)
				.then((match) => {
					if (match) {
						const token = jwt.sign(
							{
								id: user.id,
								email: user.email,
							},
							process.env.JWT_SECRET
						);
						res.status(200).json({
							token,
						});
					} else {
						res.status(401).json({
							message: "Invalid credentials",
						});
					}
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json({ message: err });
				});
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

const registercontroller = (req, res) => {
	const {
		first_name,
		last_name,
		address,
		postcode,
		city,
		email,
		phone,
		password,
		username,
	} = req.body;
	const db = req.app.get("db");

	const saltRounds = 10;

	bcrypt
		.hash(password, saltRounds)
		.then((passwordHash) => {
			const user = {
				first_name,
				last_name,
				address,
				postcode,
				city,
				email,
				phone,
				password: passwordHash,
				username,
			};
			customerModels
				.createCustomer(db, user)
				.then((user) => {
					res.status(201).json({
						user,
					});
				})
				.catch((err) => {
					res.status(500).json({ message: err });
				});
		})
		.catch((err) => {
			res.status(500).end();
		});
};

const getCustomerById = (req, res) => {
	const db = req.app.get("db");
	const decodedTokenId = res.locals.auth.userId;

	customerModels
		.getCustomerById(db, decodedTokenId)
		.then((customer) => {
			res.status(200).json(customer);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

const updateCustomer = (req, res) => {
	const db = req.app.get("db");
	const decodedTokenId = res.locals.auth.userId;
	const { first_name, last_name, address, postcode, city, email, phone } = req.body;
	
	customerModels
		.updateCustomer(
			db,
			decodedTokenId,
			first_name,
			last_name,
			address,
			postcode,
			city,
			email,
			phone
		)
		.then((customer) => {
			res.status(200).json(customer);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

module.exports = {
	logincontroller,
	registercontroller,
	getCustomerById,
	updateCustomer,
};
