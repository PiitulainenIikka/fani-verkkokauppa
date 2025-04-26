

const getAllCartItemsForCustomer = (db, customer_id) => {
    return db.from('cart_item')
        .join('product', 'cart_item.product_id', 'product.id')
        .join('product_stock', 'cart_item.product_stock_id', 'product_stock.id')
        .select('cart_item.id as cart_item_id','product.id as id', 'cart_item.quantity', 'product.name', 'product.price', 'product_stock.size', 'product_stock.stock as max_quantity', 'product.imageName', 'product_stock.id as size_id')
        .where('customer_id', customer_id);
}
const delAllCartItemsForCustomer = (db, customer_id) => {
    return db.from('cart_item').where('customer_id', customer_id).del();
}
const addCartItem = (db, cartItem) => {
    return db.from('cart_item').insert(cartItem);
}
const clearCart = (db, customer_id) => {
    return db.from('cart_item').where('customer_id', customer_id).del();
}
const deleteCartItem = (db, cart_item_id,id) => {
    return db.from('cart_item').where('id', cart_item_id).where('customer_id',id).del();
}
const updateCartItem = (db, cart_item_id,quantity,customer_id) => {
    return db.from('cart_item').where('id',cart_item_id).where('customer_id',customer_id).update("quantity",quantity);
}
const checkIfCartItemExists = (db, customer_id, product_id, product_stock_id) => {
    return db.from('cart_item').where('customer_id', customer_id).andWhere('product_id', product_id).andWhere('product_stock_id', product_stock_id);
}
module.exports = {
    getAllCartItemsForCustomer,
    delAllCartItemsForCustomer, 
    addCartItem,
    clearCart,
    deleteCartItem,
    updateCartItem,
    checkIfCartItemExists
}