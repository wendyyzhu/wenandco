import { useState, useEffect } from "react"
import * as itemsAPI from '../utilities/items-api'
import './Shop.css'
import ItemsList from "../components/ItemsList"
import * as ordersAPI from '../utilities/orders-api'
import { Link, useNavigate } from "react-router-dom"

export default function Shop() {

    const [shopItems, setShopItems] = useState([])
    const [category, setCategory] = useState('All')
    const [cart, setCart] = useState(null)
    const navigate = useNavigate()

    useEffect(function() {
        ordersAPI.getCart()
            .then(res => setCart(res))
    }, [])


    useEffect(function() {
        itemsAPI.getAll()
            .then(res => {
                const items = res
                setShopItems(items.filter(item => {
                    if (category === 'All') {
                        return item
                    } else {
                        return category === item.category.name
                    }
                }))
            })
    },[category])

    function handleChange(evt) {
        setCategory(evt.target.value)
    }

    function handleAddToCart(itemId) {
        ordersAPI.addItemToCart(itemId)
            .then(res => {
                console.log(res)
                setCart(res)
            })
    }

    function handleChangeQty(itemId, newQty) {
        ordersAPI.setItemQtyInCart(itemId, newQty)
            .then(res => {
                console.log(res)
                setCart(res)
            })
    }

    function handleCheckout() {
        ordersAPI.checkout()
        navigate('/user')
    }

    return (
        <>
        <div className="shop">
            <div className="category-list">
                <select onChange={handleChange}>
                    <option default value="All">All</option>
                    <option value="Simplicity Collection">Simplicity Collection</option>
                    <option value="Spring Collection">Spring Collection</option>
                </select>
            </div>
            <ItemsList shopItems={shopItems} handleAddToCart={handleAddToCart}/>
        </div>
        {cart &&
        <div>
            { cart.lineItems.length === 0
                ? <h2>Your shopping cart is empty!</h2>
                : <div>
                    <h2>Shopping cart</h2>
                    {cart.lineItems.map(item => (
                        <div className="cart-items" key={item._id}>
                            <Link to={item.item._id}><img src={item.item.image[0]} alt="" /></Link>
                            <Link to={item.item._id}>{item.item.name}</Link>             
                            <h5>${item.extPrice.toFixed(2)}</h5>
                            <button onClick={() => handleChangeQty(item.item._id, item.qty - 1)}>-</button>
                            <h5>Qty: {item.qty}</h5>
                            <button onClick={() => handleChangeQty(item.item._id, item.qty + 1)}>+</button>
                        </div>
                    ))}
                    <h4>Total Price: ${cart.orderTotal.toFixed(2)}</h4>
                    <h4>Total Quantity: {cart.totalQty}</h4>
                    <button onClick={handleCheckout}>Check Out</button>
                </div>
            }
        </div>
        }
        </>
    )
}