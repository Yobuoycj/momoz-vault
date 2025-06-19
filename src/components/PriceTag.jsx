import React from 'react';

const PriceTag = ({ currency, amount }) => {
  const formatAmount = () => {
    return currency === 'UGX' 
      ? `UGX ${amount.toLocaleString()}` 
      : `KES ${amount.toLocaleString()}`;
  };

  const getBgColor = () => {
    return currency === 'UGX' 
      ? 'bg-pink-800' 
      : 'bg-gray-800';
  };

  return (
    <span className={`${getBgColor()} text-white px-3 py-1 rounded-full text-sm`}>
      {formatAmount()}
    </span>
  );
};

export default PriceTag;