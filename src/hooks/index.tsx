import React from 'react';
import { ClientProvider } from './ClientContext';
import { DeliveryProvider } from './DeliveryContext';
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
        <ClientProvider>
          <WarehouseProvider>
            <ProductProvider>
              <DeliveryProvider>
                {children}
              </DeliveryProvider>
            </ProductProvider>
          </WarehouseProvider>
        </ClientProvider> 
      </SupplierProvider>
    </UserProvider>
  </LoginProvider>
);

export default AppProvider;
