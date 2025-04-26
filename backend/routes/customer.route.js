

const express = require('express');
const router = express.Router();

const cartItemController = require('../controllers/cartItem.controller');
const customerController = require('../controllers/customercontroller');


router.get('/:id/cartItems', cartItemController.getAllCartItemsForCustomer);
router.put('/', customerController.updateCustomer);
router.post('/:id/cartItems', cartItemController.addCartItem);
router.get('/', customerController.getCustomerById);
module.exports = router;