import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useContext,useState } from 'react';
import { AppContext } from '../components/Context';
import Data from '../Data';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Payment.css';

// Import react-toastify components and styles
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Payment = () => {
    const[cartList,setCartList] = useState([]);
    const { totalPrice, cartItems } = useContext(AppContext);
    const total = totalPrice();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handlePayment = async (event) => {
        event.preventDefault();
    
        try {
            // Creating a payment method with Stripe
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            });
    
            if (error) {
                toast.error(error.message || "Payment error!");
                return; // Exit early if there's an error
            }
    
            const { id } = paymentMethod;
            // Send payment details to the backend for actual charge
            await Axios.post("http://localhost:4000/payment/card", { transaction_id: id, amount: total * 100 });
    
            // Construct cart list immediately
            const newCartList = Object.keys(cartItems)
                .filter(key => cartItems[key] > 0)
                .map(key => Data.find(data => data.product_id === Number(key)));
    
            // Send order details to the backend
            await Axios.post("http://localhost:4000/users/order", {
                email: window.localStorage.getItem("email"),
                products: newCartList,
                totalPrice: total
            });
    
            // Inform the user about the successful payment
            const toastDuration = 2000;  // Example duration: 2 seconds
            toast.success("Payment Successful!", {autoClose: toastDuration});
            setTimeout(() => {navigate("/orders");}, toastDuration);
        } catch (err) {
            // In case of any error
            toast.error("Payment Failed!");
        }
    };
    

    return (
        <div className="payment-container">
            {/* Adjusted ToastContainer */}
            <ToastContainer position="top-right" style={{ marginTop: '60px' }} />

            <form className="payment-form">
                <CardElement className="card-element" />
                <button type='button' onClick={handlePayment} className='paymentButton'>Pay now</button>
            </form>
        </div>
    );
}
