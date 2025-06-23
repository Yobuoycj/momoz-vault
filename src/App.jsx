import { Routes, Route } from 'react-router-dom';
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
import AdminRoute from './components/AdminRoute';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ProductListTable from './components/ProductListTable';
import EditProductForm from './pages/admin/EditProductForm';
import Products from './pages/Products';

function App() {
  return (
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
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <DashboardHome />
            </AdminRoute>
          } />
          <Route path="/admin/products" element={
            <AdminRoute>
              <ProductListTable />
            </AdminRoute>
          } />
          <Route path="/admin/products/edit/:id" element={
            <AdminRoute>
              <EditProductForm />
            </AdminRoute>
          } />
          <Route path="/admin/messages" element={
            <AdminRoute>
              <Messages />
            </AdminRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          } />
          <Route path="/admin/analytics" element={
            <AdminRoute>
              <SalesAnalytics />
            </AdminRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;