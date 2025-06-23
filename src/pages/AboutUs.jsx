import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-pink-500 mb-8 text-center">About Momoz Vault</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="bg-gray-900 p-6 rounded-lg border border-dark-gold">
              <h2 className="text-2xl font-serif text-gold mb-4">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Momoz Vault was born from a passion for luxury fragrances and a desire to make them accessible to everyone. 
                Founded in 2023 in Kampala, Uganda, we've grown to become a leading provider of premium oil perfumes in East Africa.
              </p>
              <p className="text-gray-300">
                Our journey began with a simple idea: everyone deserves to smell amazing without breaking the bank. 
                Today, we curate the finest fragrances from Uganda, Kenya, and around the world to bring you an unparalleled scent experience.
              </p>
            </div>
          </div>
          
          <div>
            <img 
              src="/momo.jpeg" 
              alt="Momoz Vault" 
              className="w-half h-96 object-contain bg-black rounded-lg mr-26" // <-- add ml-8 for left margin
            />
          </div>
        </div>
        
        <div className="mt-12 bg-gray-900 p-6 rounded-lg border border-dark-gold">
          <h2 className="text-2xl font-serif text-gold mb-4">Our Philosophy</h2>
          <p className="text-gray-300 mb-4">
            At Momoz Vault, we believe that fragrance is more than just a scent - it's an expression of identity, 
            a memory trigger, and a form of self-care. Our carefully curated collection represents this philosophy, 
            with each perfume telling its own unique story.
          </p>
          <p className="text-gray-300">
            We're committed to ethical sourcing, sustainable practices, and supporting local artisans. 
            Every bottle you purchase helps support communities across East Africa.
          </p>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-serif text-gold mb-6 text-center">Why Choose Momoz Vault?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'fas fa-gem',
                title: 'Premium Quality',
                desc: 'We source only the finest ingredients for long-lasting, authentic fragrances'
              },
              {
                icon: 'fas fa-tag',
                title: 'Affordable Luxury',
                desc: 'Experience high-end scents at prices that won\'t break the bank'
              },
              {
                icon: 'fas fa-shipping-fast',
                title: 'Fast Delivery',
                desc: 'Get your fragrances delivered quickly across East Africa'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-lg border border-dark-gold text-center">
                <div className="text-3xl text-gold mb-4">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;