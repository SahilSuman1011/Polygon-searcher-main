
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const SearchForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUserInfo } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim()) {
      toast.error('Please enter your first name');
      return;
    }
    
    if (!mobileNumber.trim() || !mobileNumber.match(/^\d{10}$/)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate a slight delay for UX
    setTimeout(() => {
      setUserInfo(firstName, mobileNumber);
      toast.success('Form submitted successfully');
      navigate('/map');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-2xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <motion.div
            whileTap={{ scale: 0.995 }}
            className="relative"
          >
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-200"
              placeholder="Enter your first name"
            />
          </motion.div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <motion.div
            whileTap={{ scale: 0.995 }}
            className="relative"
          >
            <input
              id="mobileNumber"
              type="tel"
              value={mobileNumber}
              onChange={(e) => {
                // Only allow digits
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  setMobileNumber(value);
                }
              }}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-200"
              placeholder="Enter your 10-digit mobile number"
              maxLength={10}
            />
          </motion.div>
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 flex items-center justify-center"
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <span>Continue to Map</span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchForm;
