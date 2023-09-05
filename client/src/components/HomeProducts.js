import Data from '../Data';
import './HomeProducts.css';
import {AppContext} from './Context';
import {useContext} from 'react';
export const HomeProducts = () => {
    const{cartItems,addItem,removeItem,getObject} = useContext(AppContext);
    
    return (
        <div className="products">
            {Data.map((item) => (
                <div className="product-item" key={item.id}>
                    <img src={item.product_url} alt={item.product_description} />
                    <div className='description'>
                    <p>{item.product_description}</p>
                    <h3>${item.product_price}</h3>
                    </div>
                    <button className='btn' onClick={ () => addItem(item.product_id) }>Add To Cart {cartItems[item.product_id] > 0 && <>({cartItems[item.product_id]})</>}</button>
                </div>
            ))}
        </div>
    );
};
