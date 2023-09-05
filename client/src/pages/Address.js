import { Countries } from "./Countries";
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import './Address.css';
export const Address = () =>
{
    const [fullName,setFullName] = useState("");
    const [number,setNumber] = useState("");
    const [flat,setFlat] = useState("");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [code,setCode] = useState("");
    const [value,setValue] = useState("");
    const email = window.localStorage.getItem("email");
    const navigate = useNavigate();
    const allFieldsFilled = fullName && number && flat && city && state && value && code;
    const handleProceed = async (event) =>
    {
       event.preventDefault();
       if (!fullName || !number || !flat || !city || !state || !value || !code) {
        alert("Please fill out all address fields before proceeding.");
        return; // Return early to prevent the rest of the function from running
       }
       const address = `${fullName}, ${flat}, ${city}, ${state}, ${value}, ${code}, ${number}`;
       try{
        const response = await Axios.post("http://localhost:4000/users/address", {address,email});
        console.log(response.data.message);
        navigate("/payment");
       }
       catch(err)
       {
        console.log(err);
        alert(err);
       }

    }
    return (
        <div className="address">
            <h1>Add a new address</h1>
            <form className="addressContainer">
                <label htmlFor="countries">Country/Region</label>
                <Countries value={value} setValue={setValue} />
                <label htmlFor="name" >Full name (First and Last name)</label>
                <input type="text" id="name" onChange={(e) => setFullName(e.target.value)} />
                <label htmlFor="contactNumber">Phone number</label>
                <input type="number" id="contactNumber" onChange={(e) => setNumber(e.target.value)} />
                <label htmlFor="flat">Address</label>
                <input type="text" id="flat" onChange={(e) => setFlat(e.target.value)} />
                <label htmlFor="city">City</label>
                <input type="text" id="city" onChange={(e) => setCity(e.target.value)} />
                <label htmlFor="state">State</label>
                <input type="text" id="state"onChange={(e) => setState(e.target.value)} />
                <label htmlFor="code">ZIP Code</label>
                <input type="number" id="code"  onChange={(e) => setCode(e.target.value)}/>
                <button type="button" onClick={handleProceed} disabled={!allFieldsFilled}>Proceed to payment</button>
            </form>

        </div>
    );
};