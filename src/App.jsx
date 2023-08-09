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
      <div>
        <ShippingBar />
        <Logo />
        <NavBar user={user} setUser={setUser} />
        {(location.pathname === "/") && <Collections />}
        {/* {(location.pathname === "/") && <Shop />} */}
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<AuthPage setUser={setUser} />} />
              <Route path="/shop" element={<Shop />}></Route>
              <Route exact path="/shop/:itemId" element={user ? <Item /> : <Navigate to="/login" />} />
              <Route path="/user" element={user ? <User user={user} /> : <Navigate to="/login" />}></Route>
              <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
      </div>
      <Footer />
    </main>
  );
}
