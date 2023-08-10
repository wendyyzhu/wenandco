const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = require('./itemSchema')

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 }, 
    item: itemSchema,
    color: { type: String }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

lineItemSchema.virtual('extPrice').get(function() {
    return this.qty * this.item.price
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    firstName: { type: 'String', default: '' },
    lastName: { type: 'String', default: ''},
    email: { type: 'String', lowercase: true, default: ''},
    address: { type: 'String', default: '' },
    contactNumber: { type: Number, default: '' },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0)
})

orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, item) => total + item.qty, 0)
})

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase()
})

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true }
    )
}

orderSchema.methods.setCart = async function(formData) {
    const cart = this
    cart.email = 'hello'
    cart.firstName = formData.firstName
    cart.lastName = formData.lastName
    cart.address = formData.address
    cart.contactNumber = formData.contactNumber
    cart.isPaid = true
    return cart.save()
}

orderSchema.methods.addItemToCart = async function (itemId) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem) {
      lineItem.qty += 1;
    } else {
      const Item = mongoose.model('Item');
      const item = await Item.findById(itemId);
      cart.lineItems.push({ item });
    }
    return cart.save();
}

orderSchema.methods.setItemQty = function(itemId, newQty) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem && newQty <= 0) {
      lineItem.deleteOne();
    } else if (lineItem) {
      lineItem.qty = newQty;
    }
    return cart.save();
}

module.exports = mongoose.model('Order', orderSchema)