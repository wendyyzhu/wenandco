import { useEffect, useState } from 'react'
import * as ordersAPI from '../utilities/orders-api'
import './User.css'
import { Link } from "react-router-dom"

export default function User({ user }) {

    const [orderHistory, setOrderHistory] = useState('')

    useEffect(function() {
        ordersAPI.getOrders()
            .then(res => {
                const orders = res
                setOrderHistory(orders.filter(order => order.user === user._id && order.isPaid))
            })
    }, [])

    return (
        <div className='user'>
            <section>
                <h1 className='hello-msg'>Hello, {user.name}</h1>
                <h3 className='email'>Email: {user.email}</h3>
                <h3 className='previous-order'>Previous Orders:</h3>
            </section>

            {orderHistory && orderHistory.length !== 0
                ? <div className='order-wrapper'>
                    {orderHistory.map((order, idx) => (
                        <div className='order-details' key={idx}>
                            <div className='order-header'>
                                <h4>Order #: {order.orderId}</h4>
                                <h4>Date: {order.updatedAt.slice(0, 10)}</h4>
                                <h4>Total Qty: {order.totalQty}</h4>
                                <h4>Total Price: ${order.orderTotal.toFixed(2)}</h4>
                            </div>
                            <div>
                                {order.lineItems.map(item => (
                                    <div key={item.item._id} className='order-items'>
                                        <img src={item.item.image[0]} alt="" />
                                        <h4>{item.item.name}</h4>             
                                        <h5>Qty: {item.qty}</h5>
                                        <h5>${item.extPrice.toFixed(2)}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                : <>
                    <h2>Oh no...</h2>
                    <h2>You've got no previous orders!</h2>
                    <h3>Let's start shopping!</h3> 
                    <Link to="/shop"><img id="empty-img" src="https://res.cloudinary.com/dtekuqa73/image/upload/v1691547093/wenandco/pastel-oval-tray5_pwfnlc.jpg" alt="" /></Link>
                </>
            }
        </div>
    )
}