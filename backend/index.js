require("dotenv").config();
const validateSchema = require("./middleware/validate.js");
const express = require("express");
const path = require("path");

const config = require("./knexfile.js")[process.env.NODE_ENV || "development"];
const knex = require("knex")(config);
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.set("db", knex);
// app.use(express.static(path.join(__dirname, "./build")));

// Middleware
const isAuth = require("./middleware/auth.js").isAuth;
// Schemas
const orderSchema = require("./schemas/orderSchema.json");
const customerSchema = require("./schemas/customerSchema.json");

// Controllers
const userController = require("./controllers/customercontroller");

// Routers
const productsRouter = require("./routes/products.route");
const ordersRouter = require("./routes/orders.route");
const customerRouter = require("./routes/customer.route");
const cartItemRouter = require("./routes/cartItem.route");

// Routes
app.use("/api/cart", isAuth, cartItemRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", validateSchema(orderSchema), ordersRouter);
app.use("/api/customer", isAuth, customerRouter);
app.post("/api/login", userController.logincontroller);
app.post(
	"/api/register",
	validateSchema(customerSchema),
	userController.registercontroller
);

// app.get("*", (req, res) => {
// 	const index = path.join(__dirname, "/", "./build/", "index.html");
// 	res.sendFile(index);
// });

app.listen(config.PORT, () => {
	console.log("Server started", config.PORT);
});
