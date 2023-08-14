import { Link } from "react-router-dom"
import * as itemsAPI from '../utilities/items-api'
import * as ordersAPI from '../utilities/orders-api'

export default function CartItems({ cart, setShopItem, setCart }) {

    function handleClick(id) {
        itemsAPI.getById(id)
            .then(res => {
                setShopItem(res)
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            })
    }

    function handleChangeQty(itemId, newQty) {
        ordersAPI.setItemQtyInCart(itemId, newQty)
            .then(res => {
                setCart(res)
            })
    }

    return (
        <div>
            <h2>Your chosen items:</h2>
            {cart.lineItems.map(item => (
                <div className="cart-items" key={item._id}>
                    <Link to="" onClick={() => {handleClick(item.item._id)}}><img src={item.item.image[0]} alt="" /></Link>
                    <Link to="" onClick={() => {handleClick(item.item._id)}}>{item.item.name}</Link>             
                    <h5>${item.extPrice.toFixed(2)}</h5>
                    <button onClick={() => handleChangeQty(item.item._id, item.qty - 1)}>-</button>
                    <h5>{item.qty}</h5>
                    <button onClick={() => handleChangeQty(item.item._id, item.qty + 1)}>+</button>
                </div>
            ))}
            <Link to="/cart" className='view-cart'>View Shopping Cart</Link>
        </div>
    )
}