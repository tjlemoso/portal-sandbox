import React from 'react';
import { LoginProvider } from './LoginContext';
import { ProductProvider } from './ProductContext';
import { SupplierProvider } from './SupplierContext';
import { UserProvider } from './UserContext';
import { WarehouseProvider } from './WarehouseContext';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => (
  <LoginProvider>
    <UserProvider>
      <SupplierProvider>
          <WarehouseProvider>
            <ProductProvider>
                {children}
            </ProductProvider>
          </WarehouseProvider>
      </SupplierProvider>
    </UserProvider>
  </LoginProvider>
);

export default AppProvider;
