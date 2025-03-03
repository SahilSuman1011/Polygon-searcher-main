
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  firstName: string;
  mobileNumber: string;
  setUserInfo: (firstName: string, mobileNumber: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const setUserInfo = (firstName: string, mobileNumber: string) => {
    setFirstName(firstName);
    setMobileNumber(mobileNumber);
  };

  return (
    <UserContext.Provider value={{ firstName, mobileNumber, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
