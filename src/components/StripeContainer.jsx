import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from "./PaymentForm"
import './StripeContainer.css'


const PUBLIC_KEY = "pk_test_51NdU46ImTmoeuC9Up9l6lMXdC2bbGGVEx4YhUoTQcEL3ELbAuonH6Mx9dNTSptzZfyXLukevzziQ7gW9OXiwJHex00vyBHo7CP"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({purchaseTotal}) {
    return (
        <Elements stripe = {stripeTestPromise}>
            <PaymentForm purchaseTotal={purchaseTotal}/>
        </Elements>
    )
}