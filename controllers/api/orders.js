const Order = require('../../models/order')

module.exports = {
    cart,
    updateCart,
    addToCart,
    setItemQtyInCart,
    checkout,
    find
}

async function cart(req, res) {
    const cart = await Order.getCart(req.user._id)
    res.json(cart)
}

async function updateCart(req, res) {
    const cart = await Order.getCart(req.user._id)
    await cart.setCart(req.body.formData)
    res.json(cart)
}

async function addToCart(req, res) {
    const cart = await Order.getCart(req.user._id)
    await cart.addItemToCart(req.params.id)
    res.json(cart)
}

async function setItemQtyInCart(req, res) {
    const cart = await Order.getCart(req.user._id)
    await cart.setItemQty(req.body.itemId, req.body.newQty)
    res.json(cart)
}

async function checkout(req, res) {
    const cart = await Order.getCart(req.user._id)
    cart.isPaid = true
    await cart.save()
    res.json(cart)
}

async function find(req, res, next) {
    Order.find()
        .then(orders => res.json(orders))
        .catch(next)
}
