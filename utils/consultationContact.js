export const WHATSAPP_NUMBER = "5512992057736";

export const consultationWhatsAppUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
