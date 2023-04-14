import React from 'react';
import { LoginProvider } from './LoginContext';
import { UserProvider } from './UserContext';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => (
  <LoginProvider>
    <UserProvider>

                {children}

    </UserProvider>
  </LoginProvider>
);

export default AppProvider;
