import sendRequest from './send-request'

export function getOrders() {
    return sendRequest('/api/orders')
}

export function getCart() {
    return sendRequest('/api/orders/cart')
}

export function addItemToCart(itemId) {
    return sendRequest(`/api/orders/cart/items/${itemId}`, 'POST')
}

export function setItemQtyInCart(itemId, newQty) {
    return sendRequest('/api/orders/cart/qty', 'PUT', {itemId, newQty})
}

export function checkout() {
    return sendRequest('/api/orders/cart/checkout', 'POST')
}

export function updateOrder(formData) {
    return sendRequest('/api/orders/cart', 'PUT', {formData})
}