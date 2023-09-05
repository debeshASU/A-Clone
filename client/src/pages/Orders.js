import Axios from 'axios';
import { useState, useEffect } from 'react';
import './Orders.css'; // Assuming you named your CSS file as Orders.css

export const Orders = () => {
    const [address, setAddress] = useState("");
    const [orders, setOrders] = useState([]);
    const email = window.localStorage.getItem("email");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`http://localhost:4000/users/order?email=${email}`);
                
                if (response.data && Array.isArray(response.data.orders)) {
                    setOrders(response.data.orders);
                    setAddress(response.data.address);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="orders-container">
            {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                    <div className="order" key={order._id}>
                        <h2>Order ID: {order._id}</h2>
                        {order.products.map((product) => (
                            <div className="product" key={product._id}>
                                <img className='orderImage' src={product.product_url} alt={product.product_description} />
                                <div>
                                    <h4>{product.product_description}</h4>
                                </div>
                            </div>
                        ))}
                        <div className="total-price">
                            <h2><strong>Total Price: ${order.totalPrice}</strong></h2>
                        </div>
                    </div>
                ))
            ) : (
                <h1>You have no orders yet!</h1>
            )}

            {address && (
                <div className="address">
                    <h2>Shipping Address:</h2>
                    <h3>{address}</h3>
                </div>
            )}
        </div>
    );
};
