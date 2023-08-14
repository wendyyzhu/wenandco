import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useState } from "react"
import './PaymentForm.css'
import * as ordersAPI from '../utilities/orders-api'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "rgb(84, 83, 66)",
			color: "red"
		}
	}
}

export default function PaymentForm({ purchaseTotal }) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        contactNumber: ""
    })

    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value}
        setFormData(newFormData)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("https://wenandco.onrender.com/payment", {
                    amount: Number((purchaseTotal * 100).toFixed(2)),
                    id: id
                })
                    
                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                    ordersAPI.updateOrder(formData)
                    .then(res => res)
                }
            } catch (error) {
                console.log("Error", error)
            } 

        } else {
            console.log(error.message)
        }
    }

    return (
        <div className="payment-form-wrapper">
        {!success ? 
        <>
            <h2>Check Out</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-details">
                    <input name="email" type="email" placeholder='Email' onChange={handleChange}/>
                    <input name="firstName" type="text" placeholder='First name' onChange={handleChange}/>
                    <input name="lastName" type="text" placeholder='Last name' onChange={handleChange}/>
                    <input name="address" type="text" placeholder='Shipping address' onChange={handleChange}/>
                    <input name="contactNumber" type="number" placeholder='Phone' onChange={handleChange}/>
                </div>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <button>Pay Now</button>
            </form>
        </>
            :
            <div>
                <h2>Thank you for your purchase!</h2>
            </div>
        }
        </div>
    )
}