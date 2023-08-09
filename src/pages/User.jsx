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
                console.log(res)
                const orders = res
                setOrderHistory(orders.filter(order => order.user === user._id && order.isPaid))
            })
            console.log(orderHistory)
    }, [])

    return (
        <div className='user'>
            <h2>Hello, {user.name}</h2>
            <h3>Email: {user.email}</h3>
            <h2>Previous Orders</h2>
            {orderHistory 
                ? <div>
                    {orderHistory.map((order, idx) => (
                        <div className='order-details' key={idx}>
                        <h4>Order number: {order.orderId}</h4>
                        <h4>Order date: {order.updatedAt.slice(0, 10)}</h4>
                        <div>
                            {order.lineItems.map(item => (
                                <div key={item.item._id}>
                                    <Link to={item.item._id}><img src={item.item.image[0]} alt="" /></Link>
                                    <Link to={item.item._id}>{item.item.name}</Link>             
                                    <h5>${item.extPrice.toFixed(2)}</h5>
                                    <h5>Qty: {item.qty}</h5>
                                </div>
                            ))}
                        </div>
                        <h4>Total Price: ${order.orderTotal.toFixed(2)}</h4>
                        <h4>Total Quantity: {order.totalQty}</h4>
                        </div>
                    ))}

                </div>
                : <h4>No previous orders</h4>
            }
            
        </div>

    )
}