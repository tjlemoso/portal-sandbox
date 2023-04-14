import React from 'react';
import { LoginProvider } from './LoginContext';
import { UserProvider } from './UserContext';
import { WarehouseProvider } from './WarehouseContext';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => (
  <LoginProvider>
    <UserProvider>
          <WarehouseProvider>
                {children}
          </WarehouseProvider>
    </UserProvider>
  </LoginProvider>
);

export default AppProvider;
