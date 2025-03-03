
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TransitionContainerProps {
  children: ReactNode;
  className?: string;
}

const TransitionContainer: React.FC<TransitionContainerProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TransitionContainer;
