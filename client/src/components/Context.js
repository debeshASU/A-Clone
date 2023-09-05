import { useState,createContext } from "react";
import Data from '../Data';

export const AppContext = new createContext();

// utility function
const getObject = () =>
{
    let obj = {};
    for( let i=1; i<=Data.length; i++ )
    {
       obj[i] = 0;
    }
    return obj;
}

export const ContextProvider = (props) =>
{
   const[cartItems,setCartItems] = useState(getObject());

   const addItem = (id) =>
   {
      setCartItems( (prev) => ({ ...prev, [id] : prev[id] + 1 }) );
   };
   const removeItem = (id) =>
   {
    setCartItems( (prev) => ({ ...prev, [id] : prev[id] - 1 }) );
   };
   const totalPrice = () =>
   {
      let total = 0;
      for( const key in cartItems )
      {
         if( cartItems[key] > 0 )
         {
            let item = Data.find( (data) => data.product_id === Number(key)  );
            total += item.product_price * cartItems[key];
         }
      }
      return total;
   }
   return (<AppContext.Provider value={{cartItems,addItem,removeItem,getObject,totalPrice}}>
     {props.children}
   </AppContext.Provider>

   );
};