import { checkToken } from '../utilities/users-service'
import { useEffect, useState } from 'react'
import * as ordersAPI from '../utilities/orders-api'
import { Link } from 'react-router-dom'
import './User.css'

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

            {orderHistory 
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
                : <h4>No previous orders</h4>
            }
            
        </div>

    )
}