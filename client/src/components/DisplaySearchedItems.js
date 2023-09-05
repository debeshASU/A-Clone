import React, { useContext } from 'react';
import { AppContext } from '../components/Context';
import Data from '../Data';
import { useLocation } from 'react-router-dom';
import './DisplaySearchedItems.css';

export const DisplaySearchedItems = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchedWord = queryParams.get('query');
    const { cartItems, addItem, removeItem } = useContext(AppContext);

    // Check if searchedWord is empty or null and return accordingly
    if (!searchedWord || searchedWord.length === 0) {
        return <p>No items to display</p>;  // or return null if you want to display nothing
    }

    return (
        <>
            {
                Data.map((data) => {
                    if (data.product_description.toLowerCase().includes(searchedWord.toLowerCase())) {
                        return (
                            <div className="searchItem" key={data.product_id}>
                                <img src={data.product_url} alt={data.product_description} />
                                <div className='searchItemDescription'>
                                    <p><strong>{data.product_description}</strong></p>
                                    <h3>${data.product_price}</h3>
                                    <div className='searchHandler'>
                                        <button type='button' onClick={() => removeItem(data.product_id)}>-</button>
                                        <input value={cartItems[data.product_id]}  />
                                        <button type='button' onClick={() => addItem(data.product_id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null; // Explicitly return null when condition is not met
                })
            }
        </>
    );
};
