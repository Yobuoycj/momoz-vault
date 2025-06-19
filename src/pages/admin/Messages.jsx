import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setMessages(data || []);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-serif text-gold mb-8">Customer Messages</h1>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-900 p-4 rounded-lg animate-pulse">
              <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-800 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">💌</div>
          <h2 className="text-xl font-bold mb-2">No Messages Yet</h2>
          <p className="text-gray-400">
            Customer messages will appear here once they start sending them.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-lg">{message.name}</div>
                  <div className="text-pink-400">{message.email}</div>
                </div>
                <div className="text-gray-400 text-sm">
                  {formatDate(message.created_at)}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-300 whitespace-pre-line">{message.message}</p>
              </div>
              
              <div className="flex gap-2">
                <a 
                  href={`mailto:${message.email}`} 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                >
                  Reply via Email
                </a>
                <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm">
                  Mark as Read
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;