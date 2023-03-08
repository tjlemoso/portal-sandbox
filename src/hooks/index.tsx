import React from 'react';
import { ClientProvider } from './ClientContext';
import { DeliveryProvider } from './DeliveryContext';
import { ProductProvider } from './ProductContext';
import { SupplierProvider } from './SupplierContext';
import { WarehouseProvider } from './WarehouseContext';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => (
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
);

export default AppProvider;
