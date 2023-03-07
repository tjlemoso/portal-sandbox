import React from 'react';
import { ClientProvider } from './ClientContext';
import { SupplierProvider } from './SupplierContext';
import { WarehouseProvider } from './WarehouseContext';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => (
  <SupplierProvider>
    <ClientProvider>
      <WarehouseProvider>
        {children}
      </WarehouseProvider>
    </ClientProvider> 
  </SupplierProvider>
);

export default AppProvider;
