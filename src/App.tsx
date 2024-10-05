import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
    <Route path='/' element={<MainLayout/>}>
    <Route path="" element={<Home />} />
    <Route path="/cart" element={<Cart />}  />
    <Route path="*" element={<NotFound />}  />
     </Route>
    </Routes>
  );
}

export default App;
