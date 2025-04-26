const { getAuthId } = require('../middleware/auth');
const cartItemModels = require('../models/cartItem.model');

const addCartItem = (req, res) => {
    const { product_id, quantity, size_id } = req.body;
    const customer_id = getAuthId(req);
    const db = req.app.get('db');
    const cartItem = {
        customer_id,
        product_id,
        product_stock_id: size_id,
        quantity
    };
    cartItemModels.checkIfCartItemExists(db, customer_id, product_id, size_id)
        .then((ExistcartItem) => {
            if (ExistcartItem.length > 0) {
                cartItemModels.updateCartItem(db, ExistcartItem[0].id, ExistcartItem[0].quantity + quantity, customer_id)
                    .then((cart) => {
                        res.status(200).json({
                            message: 'Cart item updated',
                        });
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({ message: 'error' });
                    });
            } else {
                cartItemModels.addCartItem(db, cartItem)
                    .then((cartItem) => {
                        res.status(201).json({
                            cartItem,
                        });
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({ message: 'Error' });
                    });
            }
        })

}

const getAllCartItemsForCustomer = (req, res) => {
    const db = req.app.get('db');
    const id = getAuthId(req)

    cartItemModels.getAllCartItemsForCustomer(db, id)
        .then((cartItems) => {
            res.status(200).json({
                cartItems,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error' });
        });
}
const clearCart = (req, res) => {
    const db = req.app.get('db');
    const id = getAuthId(req)

    cartItemModels.clearCart(db, id)
        .then((cartItems) => {
            res.status(200).json({
                cartItems,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error' });
        });
}

const deleteCartItem = (req, res) => {
    const db = req.app.get('db');
    const { cart_item_id } = req.body;
    const id = getAuthId(req)
    cartItemModels.deleteCartItem(db, cart_item_id, id)
        .then((cartItem) => {
            res.status(200).json({
                cartItem,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error' });
        });
}

const updateCartItem = (req, res) => {
    const db = req.app.get('db');
    const { cart_item_id, quantity } = req.body;
    const customer_id = getAuthId(req)
    cartItemModels.updateCartItem(db, cart_item_id, quantity, customer_id)
        .then((cart) => {
            res.status(200).json({
                message: 'Cart item updated',
            });
        })
        .catch(() => {
            res.status(500).json({ message: 'error' });
        });
}



module.exports = {
    addCartItem,
    getAllCartItemsForCustomer,
    clearCart,
    deleteCartItem,
    updateCartItem
}