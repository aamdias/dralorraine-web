// import Script from 'next/script';
// import { useEffect } from 'react';

// export const CalendlyWidget = ({ onDateSelected }) => {
//   useEffect(() => {
//     function isCalendlyEvent(e) {
//       return e.data.event && e.data.event.indexOf('calendly') === 0;
//     }

//     function handleMessage(e) {
//       if (isCalendlyEvent(e) && e.data.event === 'calendly.date_and_time_selected') {
//         onDateSelected();
//       }
//     }

//     window.addEventListener('message', handleMessage);

//     return () => {
//       window.removeEventListener('message', handleMessage);
//     };
//   }, [onDateSelected]);

//   return (
//     <>
//       <div 
//         className="calendly-inline-widget" 
//         data-url="https://calendly.com/lorraine-souza/mentoria-para-residencia-medica?hide_event_type_details=1&hide_gdpr_banner=1" 
//         style={{minWidth: '320px', height: '700px'}}
//       />
//       <Script 
//         src="https://assets.calendly.com/assets/external/widget.js"
//         strategy="lazyOnload"
//       />
//     </>
//   );
// };

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Button } from "@components/Button";

export const CalendlyWidget = ({ onDateSelected }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (onDateSelected) {
      onDateSelected();
    }
  };

  useEffect(() => {
    if (isClient) {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isClient]);

  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Button className="flex flex-row mx-auto w-72">
        <a href="" onClick={handleLinkClick}>Ver horários disponíveis</a>
      </Button>
    </>
  );
};




