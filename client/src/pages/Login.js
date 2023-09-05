import { Link } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[_,setCookie] = useCookies(["Access_Token"]);

    const validation = () => {
        if (email.length === 0 || password.length === 0) {
            return false;
        }
        return true;
    }

    const login = async () => {
        const validate = validation();
        if (validate) {
            try {
                const response = await Axios.post("http://localhost:4000/users/login", { email, password });
                console.log(response.data);
                if (response.data.success) {
                    setCookie("Access_Token",response.data.token);
                    window.localStorage.setItem("email",response.data.email);
                    const toastDuration = 2000;  // Example duration: 2 seconds
                    toast(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'custom-toast',
                        autoClose: toastDuration
                    });
                    setTimeout(() => {
                        navigate("/");
                    }, toastDuration);
                } else {
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'custom-toast'
                    });
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.error("Please provide correct details...!!!", {
                position: toast.POSITION.TOP_RIGHT,
                className: 'custom-toast'
            });
        }
    };
    
    

    const register = async () => {
        const validate = validation();
        if (validate) {
            try {
                const response = await Axios.post("http://localhost:4000/users/register", { email, password });
                console.log(response.data);
                toast(response.data.message, { 
                    position: toast.POSITION.TOP_RIGHT, 
                    className: 'custom-toast' 
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.error("Please provide correct details...!!!", { 
                position: toast.POSITION.TOP_RIGHT, 
                className: 'custom-toast' 
            });
        }
    }

    return (
        <div className="login">
            <Link to='/'>
                <img src='https://www.versionmuseum.com/images/websites/amazon-website/amazon-website%5E2000%5Elogo-iteration-nocom.jpg' alt="Amazon Logo"/>
            </Link>
            <div className="loginContainer">
                <h1>Sign-in</h1>
                <form>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" className="signInBtn" onClick={login}>Sign In</button>
                </form>
                <p>By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
                <button className="createAccountBtn" onClick={register}>Create Your Amazon Account</button>
            </div>
            <ToastContainer />
        </div>
    )
}
