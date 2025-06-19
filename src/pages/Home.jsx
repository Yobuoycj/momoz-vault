import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/client';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (error) throw error;
        
        setFeaturedProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 z-0"></div>
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-serif text-gold mb-4">
              Momoz Vault
            </h1>
            <p className="text-xl md:text-2xl text-pink-200 mb-8 max-w-2xl mx-auto">
              Luxury oil perfumes that captivate your senses without breaking the bank
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-full text-white font-medium"
              >
                Shop Collection
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-black px-8 py-3 rounded-full font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gold mb-4">Featured Fragrances</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our most popular scents, carefully crafted to leave a lasting impression
            </p>
          </div>
          
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg animate-pulse">
                  <div className="h-64 bg-gray-800"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-block border border-gold text-gold hover:bg-gold hover:text-black px-8 py-3 rounded-full font-medium"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-900 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gold mb-4">Why Choose Momoz Vault?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the difference with our premium fragrance collection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'fas fa-gem',
                title: 'Premium Quality',
                description: 'Our perfumes are crafted with the finest ingredients for long-lasting, authentic scents'
              },
              {
                icon: 'fas fa-tag',
                title: 'Affordable Luxury',
                description: 'Experience high-end fragrances at prices that make luxury accessible to everyone'
              },
              {
                icon: 'fas fa-globe-africa',
                title: 'East African Crafted',
                description: 'Support local artisans with our unique Ugandan and Kenyan fragrances'
              },
              {
                icon: 'fas fa-shipping-fast',
                title: 'Fast Delivery',
                description: 'Get your order delivered quickly across East Africa'
              },
              {
                icon: 'fas fa-recycle',
                title: 'Eco-Friendly',
                description: 'We use sustainable packaging and ethical sourcing practices'
              },
              {
                icon: 'fas fa-gift',
                title: 'Gift Ready',
                description: 'Perfectly packaged for gifting with complimentary samples included'
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg text-center">
                <div className="text-4xl text-gold mb-4">
                  <i className={benefit.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gold mb-4">Customer Love</h2>
            <p className="text-gray-400">Hear what our customers are saying</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Sarah K.',
                location: 'Kampala, Uganda',
                content: 'The Nairobi Nights perfume is absolutely divine! I get compliments every time I wear it. The scent lasts all day without being overpowering.',
                rating: 5
              },
              {
                name: 'James M.',
                location: 'Nairobi, Kenya',
                content: 'As someone who loves luxury fragrances but hates the price tags, Momoz Vault has been a game-changer. The quality is exceptional!',
                rating: 5
              },
              {
                name: 'Beatrice N.',
                location: 'Kigali, Rwanda',
                content: 'Fast shipping and excellent customer service. The Kampala Gold scent is my new signature fragrance. Highly recommend!',
                rating: 4
              },
              {
                name: 'David T.',
                location: 'Dar es Salaam, Tanzania',
                content: 'I was skeptical about ordering perfumes online, but Momoz exceeded my expectations. The packaging was beautiful and the scents are authentic.',
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-400 mb-3">
                  {[...Array(5)].map((_, star) => (
                    <i 
                      key={star} 
                      className={`fas fa-star ${star < testimonial.rating ? 'text-yellow-400' : 'text-gray-700'}`}
                    ></i>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-gold">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-gold mb-4">Ready to Discover Your Signature Scent?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect fragrance with Momoz Vault
          </p>
          <Link 
            to="/products" 
            className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-full text-white font-medium inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;