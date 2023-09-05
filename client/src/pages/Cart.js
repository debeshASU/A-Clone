import {useContext,useState} from 'react';
import {AppContext} from '../components/Context';
import Data from '../Data';
import './Cart.css';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import Axios from 'axios';
export const Cart = () =>
{
    const{cartItems,addItem,removeItem,getObject,totalPrice} = useContext(AppContext);
    const total = totalPrice();
    
    const navigate = useNavigate();
    const[cookie,setCookie] = useCookies(["Access_Token"]);
    const notLoggedInRedirect = () =>
    {
        navigate("/login");
    }
    const loggedInRedirect = async () =>
    {
        try{
            navigate("/address");

        }
        catch(err)
        {
            console.log(err);
        }
        
    }
    return (
       <div className='cart'>
         {
            Data.map( (item) =>
            {
                if( cartItems[item.product_id] !== 0 )
                {
                    return (  
                        <div className="cartItem" key={item.id}>
                        <img src={item.product_url} alt={item.product_description} />
                        <div className='cartItemDescription'>
                        <p><strong>{item.product_description}</strong></p>
                        <h3>${item.product_price}</h3>
                        <div className='countHandler'>
                        <button type='button' onClick={ () => removeItem(item.product_id) }>-</button>
                        <input value={cartItems[item.product_id]}  />
                        <button type='button' onClick={ () => addItem(item.product_id) }>+</button>
                        </div>
                        </div>
                    </div>
                    );
                }
            } )
            
         }
         {total > 0 ? (
    <>
        <h1>Subtotal : ${total}</h1>
        {cookie.Access_Token ? (
            <button type='button' className='paymentBtn' onClick={loggedInRedirect}>Checkout</button>
        ) : (
            <button type='button' className='paymentBtn' onClick={notLoggedInRedirect}>Checkout</button>
        )}
    </>
) : (
    <h1>Your cart is empty...!!!</h1>
)}

</div>
);
}