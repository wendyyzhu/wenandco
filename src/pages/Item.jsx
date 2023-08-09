import { useParams } from 'react-router-dom'
import './Item.css'
import * as itemsAPI from '../utilities/items-api'
import { useState, useEffect } from 'react'
import * as ordersAPI from '../utilities/orders-api'
import { Link } from "react-router-dom"
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

const down = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
<path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>

const up = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up" viewBox="0 0 16 16">
<path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
</svg>

const addToCart = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
<path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>

export default function Item() {

    const [shopItem, setShopItem] = useState('')
    const [cart, setCart] = useState(null)
    const [toCare, setToCare] = useState(false)
    const [toRefund, setToRefund] = useState(false)
    const [toShipping, setToShipping] = useState(false)

    const { itemId } = useParams()
    console.log(itemId);

    useEffect(function() {
        itemsAPI.getById(itemId)
            .then(res => {
                console.log(res)
                setShopItem(res)
            })
    },[])

    useEffect(function() {
        ordersAPI.getCart()
            .then(res => setCart(res))
    }, [])

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

    function handleCare() {
        setToCare(!toCare)
    }

    function handleRefund() {
        setToRefund(!toRefund)
    }

    function handleShipping() {
        setToShipping(!toShipping)
    }

    return (
        <div className='page-wrapper'>
        <div className='item-details'>
            {shopItem && 
                <>
                <div className='box'>
                    <Carousel useKeyboardArrows={true}>
                        {shopItem.image.map((image, idx) => (
                            <div className="slide" key={idx}>
                                <img src={image} alt="" />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <section>
                    <h2>{shopItem.name}</h2>
                    <h3>${shopItem.price}</h3>
                    <p>{shopItem.description}</p>
                    <p>Size: {shopItem.size}</p>
                    <div className='add-to-cart' onClick={() => {handleAddToCart(shopItem._id)}}>
                        <h4>{addToCart}</h4>
                        <h4>Add to cart</h4>
                    </div>
                    
                    <div className='care-instructions'>
                        <h4 onClick={handleCare}>Care instructions</h4>
                        {toCare ? <span onClick={handleCare}>{down}</span>
                                : <span onClick={handleCare}>{up}</span>}
                    </div>
                    {toCare &&
                        <div className='care-text'>
                            <p>To reduce staining, ensure to wipe down all spills as soon as possible. The product can be wiped down with a soft cloth and a little bit of warm soapy water but avoid using harsh chemicals and cleaners.</p>
                            <p>The material used is strong, but avoid dropping or using force as the product may chip or break.</p>
                            <p>Our products are not dishwasher or microwave friendly.</p>
                        </div>
                    }

                    <hr />

                    <div className='care-instructions'>
                        <h4 onClick={handleRefund}>Return & Refund Policy</h4>
                        {toRefund ? <span onClick={handleRefund}>{down}</span>
                                : <span onClick={handleRefund}>{up}</span>}
                    </div>
                    {toRefund &&
                        <div className='care-text'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis praesentium cumque, debitis natus alias commodi similique eum. Nostrum magnam et eligendi! Nemo quas ratione, sequi velit aliquam illo? Omnis, qui?</p>
                        </div>
                    }

                    <hr />

                    <div className='care-instructions'>
                        <h4 onClick={handleShipping}>Shipping Info</h4>
                        {toShipping ? <span onClick={handleShipping}>{down}</span>
                                : <span onClick={handleShipping}>{up}</span>}
                    </div>
                    {toShipping &&
                        <div className='care-text'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis praesentium cumque, debitis natus alias commodi similique eum. Nostrum magnam et eligendi! Nemo quas ratione, sequi velit aliquam illo? Omnis, qui?</p>
                        </div>
                    }
                </section>
                </>
            } 
        </div>
        
        {cart &&
        <div className='cart-wrapper'>
            { cart.lineItems.length === 0
                ? <h2>Your shopping cart is empty!</h2>
                : <div>
                    <h2>Your chosen items:</h2>
                    {cart.lineItems.map(item => (
                        <div className="cart-items" key={item._id}>
                            <Link to={item.item._id}><img src={item.item.image[0]} alt="" /></Link>
                            <Link to={item.item._id}>{item.item.name}</Link>             
                            <h5>${item.extPrice.toFixed(2)}</h5>
                            <button onClick={() => handleChangeQty(item.item._id, item.qty - 1)}>-</button>
                            <h5>{item.qty}</h5>
                            <button onClick={() => handleChangeQty(item.item._id, item.qty + 1)}>+</button>
                        </div>
                    ))}
                    <Link to="/cart" className='view-cart'>View Cart</Link>
                </div>
            }
        </div>
        }
        </div>
    )
}