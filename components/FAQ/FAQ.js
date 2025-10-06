import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 pr-8">
              {item.question}
            </h3>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <svg 
                className="w-6 h-6 text-secondary-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {typeof item.answer === 'string' ? (
                    <p>{item.answer}</p>
                  ) : (
                    item.answer
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

