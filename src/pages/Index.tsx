
import React from 'react';
import SearchForm from '@/components/SearchForm';
import { motion } from 'framer-motion';
import TransitionContainer from '@/components/TransitionContainer';

const Index = () => {
  return (
    <TransitionContainer className="page-container">
      <div className="w-full max-w-md flex flex-col items-center">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-2 text-sm font-medium text-primary/80 tracking-wide">
            WELCOME TO
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Polygon Mapper
          </h1>
          <p className="text-gray-600 max-w-sm mx-auto">
            Enter your information to continue to the interactive mapping experience.
          </p>
        </motion.div>
        
        <SearchForm />
        
        <motion.div 
          className="mt-10 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          Powered by OpenLayers
        </motion.div>
      </div>
    </TransitionContainer>
  );
};

export default Index;
