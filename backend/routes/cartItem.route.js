const express = require("express");
const router = express.Router();

const cartItemController = require("../controllers/cartItem.controller");

router.get("/", cartItemController.getAllCartItemsForCustomer);
router.post("/", cartItemController.addCartItem);
router.delete("/", cartItemController.deleteCartItem);
router.delete("/all", cartItemController.clearCart);
router.put("/", cartItemController.updateCartItem)

module.exports = router; 