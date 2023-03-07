import * as React from 'react';
import { ISupplier } from "@/interface/ISupplier";
import { del, get, post, put, getSingle } from "@/services/SupplierService";

export interface ISupplierContextType {
  supplierList: () => Promise<ISupplier[]>;
  create: (supplier: ISupplier) => void;
  update: (id: number, supplier:ISupplier) => Promise<ISupplier>;
  remove: (id: number) => Promise<number>;
  getById: (id: number) => Promise<ISupplier>;
};

export const SupplierContext = React.createContext<ISupplierContextType>({} as ISupplierContextType,);

interface Props {
  children: React.ReactNode;
}

const SupplierProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {

  const supplierList = React.useCallback(
    async () => {
      const result = await get();
      return result;
    },
    [],
  );

  const create = React.useCallback(
    async (supplier: ISupplier) => {
      console.log('create supplier context =', supplier);
      const result = await post(supplier);
      console.log('result create supplier context =', result);
      return result;
    }, 
    []
  );

  const update = React.useCallback(
    async (id: number, supplier: ISupplier) => {
      console.log('Update supplier context =', supplier);
      const result = await put(id, supplier);
      console.log('result create supplier context =', result);
      return result;
    }, 
    []
  );

  const remove = React.useCallback(
    async (id: number) => {
      console.log('Update supplier context =', id);
      const result = await del(id);
      console.log('result create supplier context =', result);
      //return result;
    }, 
    []
  );

  const getById = React.useCallback(
    async (id: number) => {
      console.log('Update supplier context =', id);
      const result = await getSingle(id);
      console.log('result create supplier context =', result);
      return result;
    }, 
    []
  );

  
  return (
    <SupplierContext.Provider 
      value={{ 
        supplierList, 
        create, 
        update, 
        remove,
        getById }}>
      {children}
    </SupplierContext.Provider>
  );
}

function useSupplier(): ISupplierContextType {
  const context = React.useContext(SupplierContext);

  if (!context) {
    throw new Error(' ------------------ ');
  }

  return context;
}

export { useSupplier, SupplierProvider };
