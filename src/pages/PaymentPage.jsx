import { useLocation, useNavigate } from 'react-router-dom';
import { useFlutterwave } from 'flutterwave-react-v3';
import { supabase } from '../supabase/supabase';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: order?.amount || 0,
    currency: 'UGX',
    payment_options: 'card,mobilemoneyuganda',
    customer: {
      email: order?.email || 'customer@example.com',
      phonenumber: order?.phone || '0700000000',
      name: order?.customer_name || 'Customer'
    },
    customizations: {
      title: 'Momoz Vault Perfume Purchase',
      description: 'Payment for luxury fragrances',
      logo: 'https://momozvault.vercel.app/logo.png'
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        if (response.status === 'successful') {
          // Update order status in Supabase
          supabase
            .from('orders')
            .update({ status: 'paid', transaction_id: response.transaction_id })
            .eq('id', order.id)
            .then(() => {
              navigate('/thank-you', { state: { order } });
            });
        } else {
          navigate('/payment-failed');
        }
      },
      onClose: () => {
        console.log("Payment closed");
      },
    });
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="text-5xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold mb-4">Order Information Missing</h1>
        <p className="text-gray-400 mb-6 text-center">
          It seems there was a problem retrieving your order details.
          Please return to checkout and try again.
        </p>
        <a 
          href="/checkout" 
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded text-white"
        >
          Return to Checkout
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg p-8">
        <h1 className="text-3xl font-serif text-gold mb-6 text-center">Complete Your Payment</h1>
        
        <div className="mb-8 text-center">
          <div className="text-5xl mb-4">💳</div>
          <p className="text-xl font-bold mb-2">Order Total</p>
          <p className="text-3xl text-gold mb-6">UGX {order.amount.toLocaleString()}</p>
          <p className="text-gray-400">Order #: {order.id.slice(0, 8)}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
          
          <div className="space-y-4">
            <button 
              onClick={handlePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white flex items-center justify-center gap-2"
            >
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              Credit/Debit Card
            </button>
            
            <button 
              onClick={handlePayment}
              className="w-full bg-yellow-600 hover:bg-yellow-700 py-3 rounded text-white flex items-center justify-center gap-2"
            >
              <i className="fas fa-mobile-alt"></i>
              Mobile Money (MTN, Airtel)
            </button>
            
            <div className="text-center text-gray-400 text-sm">
              <i className="fas fa-lock mr-2"></i>
              Secure Payment Processing
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm">
          By completing your payment, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;