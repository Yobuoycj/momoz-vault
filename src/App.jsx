import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactReviews from './pages/ContactReviews';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import MyOrders from './pages/MyOrders';
import AdminLogin from './pages/admin/AdminLogin';
import DashboardHome from './pages/admin/DashboardHome';
import ManageProducts from './pages/admin/ManageProducts';
import Messages from './pages/admin/Messages';
import Orders from './pages/admin/Orders';
import SalesAnalytics from './pages/admin/SalesAnalytics';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-black text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactReviews />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/thank-you" element={<PaymentSuccess />} />
              <Route path="/my-orders" element={<MyOrders />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<DashboardHome />} />
              <Route path="/admin/products" element={<ManageProducts />} />
              <Route path="/admin/messages" element={<Messages />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/analytics" element={<SalesAnalytics />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;