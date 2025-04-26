const models = require('../models/product.model.js');


const getAllProducts = (req, res) => {
	const db = req.app.get('db');
	models.getAllProducts(db)
		.then((products) => {
			res.json(products);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Error' });
		});
};
const getProductById = (req, res) => {
	const db = req.app.get('db');
	const id = req.params.id;

	models.getProductById(db, id)
		.then((product) => {
			res.json(product);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Error' });
		});
};
const createProduct = (req, res) => {
	const { name, price, description, img } = req.body;
	const db = req.app.get('db');

	const product = {
		name,
		price,
		description,
		img
	};
	models.createProduct(db, product)
		.then((product) => {
			res.status(201).json(product);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error' });
		});
};
const updateProduct = (req, res) => {
	const id = req.params.id;
	const { name, price, description, img } = req.body;
	const db = req.app.get('db');
	const product = {
		name,
		price,
		description,
		img
	};
	models.updateProduct(db, id, product)
		.then((product) => {
			res.status(201).json(product);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error' });
		});
};
const deleteProduct = (req, res) => {
	const id = req.params.id;
	const db = req.app.get('db');

	models.deleteProduct(db, id)
		.then((product) => {
			res.status(204).json(product);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error' });
		});
};
const getRandomProducts = (req, res) => {
	const db = req.app.get('db');

	models.getRandomProducts(db)
		.then((products) => {
			res.status(200).json(products);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Error' });
		});
}
const getProductStockById = (req, res) => {
	const db = req.app.get('db');
	const id = req.params.id;

	models.getProductStockById(db, id)
		.then((sizes) => {
			res.status(200).json(sizes);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Error' });
		});
};
const searchProducts = (req, res) => {
	const db = req.app.get('db');
	const search = req.params.search;
	models.searchProducts(db, search)
		.then((products) => {
			res.status(200).json(products);
		})
}

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	getRandomProducts,
	getProductStockById,
	searchProducts
};