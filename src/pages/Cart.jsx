import './Cart.css'
import { useState, useEffect } from "react"
import * as ordersAPI from '../utilities/orders-api'
import { Link } from 'react-router-dom'
import StripeContainer from '../components/StripeContainer'

export default function Cart() {

    const [cart, setCart] = useState(null)
    const [showItem, setShowItem] = useState(false) 

    useEffect(function() {
        ordersAPI.getCart()
            .then(res => {
                setCart(res)})
    }, [])

    function handleChangeQty(itemId, newQty) {
    ordersAPI.setItemQtyInCart(itemId, newQty)
        .then(res => {
            setCart(res)
        })
    }

    function handleCheckout() {
        setShowItem(true)
    }

    return (
        <>
        {cart &&
        <div className='cart-page-wrapper'>
            { cart.lineItems.length === 0
                ? <>
                    <h2>Oh no...</h2>
                    <h2>Your shopping cart is empty!</h2>
                    <h3>Let's start shopping!</h3> 
                    <Link to="/shop"><img id="empty-img" src="https://res.cloudinary.com/dtekuqa73/image/upload/v1691584658/wenandco/download_6_irzhri.png" alt="" /></Link>
                </>
                : <div>
                    <h2>Shopping cart</h2>
                    {cart.lineItems.map(item => (
                        <div className="cart-items" key={item._id}>
                            <Link to={`/shop/${item.item._id}`}><img src={item.item.image[0]} alt="" /></Link>
                            <Link to={`/shop/${item.item._id}`}>{item.item.name}</Link>             
                            <h5>${item.extPrice.toFixed(2)}</h5>
                            <button onClick={() => handleChangeQty(item.item._id, item.qty - 1)}>-</button>
                            <h5>{item.qty}</h5>
                            <button onClick={() => handleChangeQty(item.item._id, item.qty + 1)}>+</button>
                        </div>
                    ))}
                    <h3>Total Price: ${cart.orderTotal.toFixed(2)}</h3>
                    <h4>Total Quantity: {cart.totalQty}</h4>
                    {showItem ? <StripeContainer purchaseTotal={cart.orderTotal.toFixed(2)}/> 
                              : <button onClick={handleCheckout} className='checkout-btn'>Check Out Now</button>}
                </div>
            }   
        </div>
        }
       </>
    )
}