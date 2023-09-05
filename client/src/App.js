import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Picture } from './components/Picture';
import { HomeProducts } from './components/HomeProducts';
import { Login } from './pages/Login';
import { Cart } from './pages/Cart';
import { ContextProvider } from './components/Context';
import { StripeContainer } from './pages/StripeContainer';
import { Countries } from './pages/Countries';
import { Address } from './pages/Address';
import { Orders } from './pages/Orders';
import { DisplaySearchedItems } from './components/DisplaySearchedItems';

function App() {
  return (
    <div className="App">
  <ContextProvider>
  <Router>
  <Routes>
    <Route path="/" element={
      <>
        <Navbar />
        <Picture />
        <HomeProducts />
      </>
    } />
    <Route path="/login" element={<Login />} />
    <Route path='/cart' element={<>
      <Navbar />
      <Cart />
    </>} />
    <Route path='/payment' element={<>
     <Navbar />
    <StripeContainer /></>} />
    <Route path='/address' element={<>
      <Navbar />
      <Address />
    </>} />
    <Route path='/orders' element={<>
    <Navbar />
    <Orders />
    </>} />
    <Route path='/search' element={
    <>
    <Navbar />
    <DisplaySearchedItems />
    </>
  } />
  </Routes>
</Router>
</ContextProvider>
    </div>
  );
}

export default App;
