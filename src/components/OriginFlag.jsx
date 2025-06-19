import React from 'react';

const OriginFlag = ({ country }) => {
  const getFlagStyle = () => {
    switch(country.toLowerCase()) {
      case 'uganda':
        return 'bg-yellow-500 text-black';
      case 'kenya':
        return 'bg-green-600 text-white';
      case 'international':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  const getCountryCode = () => {
    switch(country.toLowerCase()) {
      case 'uganda': return 'UGA';
      case 'kenya': return 'KEN';
      case 'international': return 'INT';
      default: return country.slice(0, 3).toUpperCase();
    }
  };

  return (
    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${getFlagStyle()}`}>
      {getCountryCode()}
    </div>
  );
};

export default OriginFlag;