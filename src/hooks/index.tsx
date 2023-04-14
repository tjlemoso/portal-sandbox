import React from 'react';
import { LoginProvider } from './LoginContext';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => (
  <LoginProvider>
    {children}
  </LoginProvider>
);

export default AppProvider;
