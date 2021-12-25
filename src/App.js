import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductsContextProvider from './contexts/productsContext';
import AuthContextProvider from './contexts/authContext';
import CartContextProvider from './contexts/cartContext';

import Navibar from './components/Navibar/Navibar';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Shop from './components/Shop/Shop';
import Auth from './components/Auth/Auth';
import Cart from './components/Cart/Cart';
import FavorContextProvider from './contexts/favorContext';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <CartContextProvider>
          <FavorContextProvider>
            <ProductsContextProvider>
              <BrowserRouter>
                <Navibar/>
                <Header/>
                  <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/auth' element={<Auth/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/chat' element={<Chat/>}/>
                  </Routes>
                <Footer/>
              </BrowserRouter>
            </ProductsContextProvider>
          </FavorContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;