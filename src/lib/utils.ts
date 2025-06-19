/**
 * General utility functions
 */
export const formatCurrency = (value: number, currency: 'UGX' | 'KES'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(value).replace('UGX', 'UGX').replace('KES', 'KES');
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F, 
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export const showNotification = (message: string) => {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '30px';
  notification.style.right = '30px';
  notification.style.backgroundColor = '#D4AF37';
  notification.style.color = '#000000';
  notification.style.padding = '15px 25px';
  notification.style.borderRadius = '8px';
  notification.style.zIndex = '1000';
  notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
  notification.style.animation = 'fadeIn 0.5s';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.5s';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
};