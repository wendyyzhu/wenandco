import './Cart.css'
import { useState, useEffect } from "react"
import * as ordersAPI from '../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {

    const [cart, setCart] = useState(null)
    const navigate = useNavigate()

    useEffect(function() {
        ordersAPI.getCart()
            .then(res => {
                console.log(res)
                setCart(res)})
    }, [])

    function handleChangeQty(itemId, newQty) {
    ordersAPI.setItemQtyInCart(itemId, newQty)
        .then(res => {
            console.log(res)
            setCart(res)
        })
    }

    function handleCheckout() {
        ordersAPI.checkout()
            .then(res => console.log(res))
        navigate('/')
    }

    return (
        <>
        {cart &&
        <div className='cart-page-wrapper'>
            { cart.lineItems.length === 0
                ? <h2>Your shopping cart is empty!</h2>
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
                    <button onClick={handleCheckout} className='checkout-btn'>Check Out Here</button>
                </div>
            }
        </div>
        }
        </>
    )
}