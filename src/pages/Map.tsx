
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Header from '@/components/Header';
import MapView from '@/components/MapView';
import TransitionContainer from '@/components/TransitionContainer';
import { toast } from 'sonner';

const Map = () => {
  const { firstName, mobileNumber } = useUser();
  const navigate = useNavigate();
  
  // Redirect if no user info
  useEffect(() => {
    if (!firstName || !mobileNumber) {
      toast.error('Please enter your information first');
      navigate('/');
    }
  }, [firstName, mobileNumber, navigate]);
  
  if (!firstName || !mobileNumber) {
    return null;
  }
  
  return (
    <TransitionContainer className="h-screen flex flex-col">
      <Header title={firstName} showBackButton />
      
      <div className="flex-1">
        <MapView />
      </div>
    </TransitionContainer>
  );
};

export default Map;
