import React, { useState } from 'react';
import { supabase } from '../supabase/supabase';

const ContactReviews = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('reviews')
        .insert([{
          name: form.name,
          email: form.email,
          message: form.message
        }]);
      
      if (error) throw error;
      
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-pink-500 mb-8 text-center">Contact & Reviews</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="mb-12">
              <p className="text-lg text-gray-300 mb-4">
                Got a question, a sweet word, or feedback on your perfume experience?  
                We're all ears and petals 🌹.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-gold mt-1">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:mail.morynzeal@gmail.com" className="text-pink-300">
                      mail.morynzeal@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-gold mt-1">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Call/WhatsApp</h3>
                    <a href="tel:+256704443171" className="text-pink-300">
                      +256 704 443171
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-gold mt-1">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Location</h3>
                    <p className="text-gray-300">Kampala, Uganda</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-serif text-gold mb-4">Business Hours</h2>
              
              <div className="space-y-2">
                {[
                  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', hours: 'Closed' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between border-b border-gray-800 pb-2">
                    <span>{item.day}</span>
                    <span className="text-gray-300">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-serif text-gold mb-4">Send us a message</h2>
            
            {submitted ? (
              <div className="bg-green-900 text-green-200 p-6 rounded-lg text-center">
                <div className="text-5xl mb-4">💖</div>
                <h3 className="text-xl font-bold mb-2">Thank you for your message!</h3>
                <p>We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-green-800 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-900 rounded-lg p-6"
              >
                {error && (
                  <div className="bg-red-900 text-red-200 p-3 rounded mb-4">
                    {error}
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-gray-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-800 text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-800 text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-400 mb-1">Your Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 rounded bg-gray-800 text-white"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded text-white disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactReviews;