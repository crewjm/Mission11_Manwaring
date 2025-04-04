import './App.css'
import BookPage from './pages/BookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {

  return (
    <>
    <CartProvider>
      <Router>
          <Routes>
            <Route path='/' element={<BookPage/>}/>
            <Route path='/books' element={<BookPage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/admin' element={<AdminBooksPage/>}/>
          </Routes>
      </Router>
    </CartProvider>
    </>
  );
}

export default App