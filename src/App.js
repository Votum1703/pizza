import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
    <Route path='/' element={<MainLayout/>}>
    <Route path="" element={<Home />} exact />
    <Route path="/cart" element={<Cart />} exact />
    <Route path="/pizza/:id" element={<FullPizza />} exact />
    <Route path="*" element={<NotFound />} exact />
     </Route>
    </Routes>
  );
}

export default App;
