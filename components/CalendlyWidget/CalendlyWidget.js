import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Button } from "@components/Button";

export const CalendlyWidget = ({ onDateSelected, onEventScheduled, purchaseCompleted }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      function isCalendlyEvent(e) {
        return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
      }

      function handleCalendlyEvent(e) {
        if (isCalendlyEvent(e)) {
          if (e.data.event === "calendly.date_and_time_selected") {
            if (!purchaseCompleted) {
              Calendly.closePopupWidget();
              onDateSelected();
            }
          } else if (e.data.event === "calendly.event_scheduled") {
            onEventScheduled();
          }
        }
      }

      window.addEventListener("message", handleCalendlyEvent);

      return () => {
        window.removeEventListener("message", handleCalendlyEvent);
      };
    }
  }, [isClient, onDateSelected, onEventScheduled, purchaseCompleted]);

  const handleLinkClick = (e) => {
    e.preventDefault();
    Calendly.initPopupWidget({ url: 'https://calendly.com/lorraine-souza/mentoria-para-residencia-medica?hide_event_type_details=1' });
  };

  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <button className="flex flex-row mx-auto w-72 bg-white p-2 rounded-md justify-center">
        <a href="" onClick={handleLinkClick}>Ver horários disponíveis</a>
      </button>
    </>
  );
};