import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from './utilities/users-service'
import AuthPage from './pages/AuthPage';
import NavBar from './components/NavBar';
import ShippingBar from './components/ShippingBar';
import Logo from './components/Logo';
import User from './pages/User'
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './components/Footer'
import Collections from './components/Collections';
import Item from './pages/Item';
import Cart from './pages/Cart';

export default function App() {

  const [user, setUser] = useState(getUser());
  const location = useLocation()

  return (
    <main className="App">
      <ShippingBar />
      <Logo />
      <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* client-side route that renders the component instance if the path matches the url in the address bar */}
            {/* <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} /> */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop" element={<Shop />} />
            <Route exact path="/shop/:itemId" element={<Item />} />
            <Route path="/user" element={<User user={user}/>}></Route>
            <Route path="/login" element={<AuthPage setUser={setUser} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
      {(location.pathname === "/") && <Collections />}
      <Footer />
    </main>
  );
}
