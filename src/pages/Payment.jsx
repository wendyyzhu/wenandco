import { useNavigate } from "react-router-dom"
import { useState } from "react"
import * as ordersAPI from '../utilities/orders-api'

export default function Payment() {

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        contactNumber: ""
    })
    const navigate = useNavigate()

    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value}
        setFormData(newFormData)
    }

    function handleCheckout() {
        ordersAPI.updateOrder(formData)
            .then(res => console.log(res))
        navigate('/payment')
    }

    return (
        <div>
            <div>
                <h3>Contact</h3>
                <input name="email" type="email" placeholder='Email' onChange={handleChange}/>

                <h3>Shipping Address</h3>
                <input name="firstName" type="text" placeholder='First name' onChange={handleChange}/>
                <input name="lastName" type="text" placeholder='Last name' onChange={handleChange}/>
                <input name="address" type="text" placeholder='Shipping address' onChange={handleChange}/>
                <select name="" id="">
                    <option value="">Australia</option>
                </select>
                <input name="contactNumber" type="number" placeholder='Phone' onChange={handleChange}/>
            </div>
                <button onClick={handleCheckout} className='checkout-btn'>Check Out Now</button>
        </div>
    )
}