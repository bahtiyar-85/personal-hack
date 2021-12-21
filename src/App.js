import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductsContextProvider from './contexts/productsContext';

import Navibar from './components/Navibar/Navibar';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Shop from './components/Shop/Shop';
import RegContextProvider from './contexts/regContext';

const App = () => {
  return (
    <div>
      <RegContextProvider>
        <ProductsContextProvider>
          <BrowserRouter>
            <Navibar/>
            <Header/>
              <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/shop' element={<Shop/>}/>
              </Routes>
            <Footer/>
          </BrowserRouter>
        </ProductsContextProvider>
      </RegContextProvider>
    </div>
  );
};

export default App;