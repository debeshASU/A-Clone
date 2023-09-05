import React from 'react';
import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css'; // Make sure to import your CSS file
import {Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import { DisplaySearchedItems } from './DisplaySearchedItems';
export const Navbar = () => {
    const[cookie,setCookie] = useCookies("Access_token");
    const email = window.localStorage.getItem("email");
    const[searchedWord,setSearchedWord] = useState('');
    const navigate = useNavigate();
    const removeCookie = () =>
    {
        setCookie("Access_Token","");
        window.localStorage.clear();
        navigate("/login");
        
    };
    const handleCookie = () =>
    {
        navigate("/login");
        
    };
    const searchItems = () => {
        navigate(`/search?query=${searchedWord}`);
    };
    return (
        <div className='navbar'>
            <Link to='/'>
            <img
                className='navbarLogo'
                src='https://www.versionmuseum.com/images/websites/amazon-website/amazon-website%5E2000%5Elogo-iteration-nocom.jpg'
                alt='amazon-clone logo'
            /></Link>
            <div className="navbarSearch">
                <input className="navbarSearchInput" type="text" onChange={(e) => setSearchedWord(e.target.value)} />
                <button className="navbarSearchButton" onClick={searchItems}>
                    <SearchIcon />
                </button>
            </div>
            <div className='navbarSignIn'>
                <span><strong>{
                    cookie.Access_Token ? <>Hello, {email}</>
                    : <>Hello, Guest</>
                    }</strong></span>
                    {
                    cookie.Access_Token ?<button onClick={removeCookie} className='bt'><span><strong><>Sign Out</></strong></span></button>
                    :<button  onClick={handleCookie} className='bt'><><span><strong><>Sign In</></strong></span></></button>
                    }
            </div>
            <div className="navbarOrders">
                <Link to='/orders'><span><strong>Returns</strong></span></Link>
                <Link to='/orders' ><span><strong>& Orders</strong></span></Link>
            </div>
            <div className="navbarCart">
                <Link to='/cart'><ShoppingCartIcon /></Link>
            </div>
            
        </div>
    );
};
