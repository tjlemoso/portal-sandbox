import React from 'react';
import {SupplierProvider} from './SupplierContext';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => (
  <SupplierProvider>
    {children}
  </SupplierProvider>
);

export default AppProvider;
