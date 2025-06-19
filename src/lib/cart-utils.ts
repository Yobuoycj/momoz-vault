/**
 * Cart-specific utilities
 */
export const updateCartCount = (count: number) => {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = count.toString();
  }
};

export const initializeCart = () => {
  const cart = localStorage.getItem('momoz_cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: any[]) => {
  localStorage.setItem('momoz_cart', JSON.stringify(cart));
  updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));
};