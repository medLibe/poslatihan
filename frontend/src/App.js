import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    // <h1 className='text-3xl underline text-red-400'>Hello world</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage/>}/>
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
