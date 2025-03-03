
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false,
  className
}) => {
  return (
    <header className={cn("w-full py-6 px-6 flex items-center justify-between", className)}>
      <div className="w-24">
        {showBackButton && (
          <Link to="/">
            <motion.button
              className="text-primary flex items-center font-medium"
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back
            </motion.button>
          </Link>
        )}
      </div>
      
      {title && (
        <motion.h1 
          className="text-lg font-medium absolute left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {title}
        </motion.h1>
      )}
      
      <div className="w-24"></div>
    </header>
  );
};

export default Header;
