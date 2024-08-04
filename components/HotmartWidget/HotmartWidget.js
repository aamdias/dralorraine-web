import { useEffect, useState } from 'react';

export const HotmartWidget = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const script = document.createElement('script');
      script.src = 'https://static.hotmart.com/checkout/widget.min.js';
      script.async = true;
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css';
      document.head.appendChild(link);
    }
  }, [isClient]);

  return (
    <>
      <a 
        onClick={(e) => e.preventDefault()} 
        href="https://pay.hotmart.com/V91028431Y?checkoutMode=2" 
        className="hotmart-fb hotmart__button-checkout"
      >
        <img src='https://static.hotmart.com/img/btn-buy-green.png' alt="Buy Button" />
      </a>
    </>
  );
};
