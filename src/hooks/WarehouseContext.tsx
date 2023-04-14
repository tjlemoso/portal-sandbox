import * as React from 'react';
import { IWarehouse } from "@/interface/IWarehouse";
import { del, get, post, put, getSingle } from "@/services/WarehouseService";

export interface IWarehouseContextType {
  warehouseList: () => Promise<IWarehouse[]|undefined>;
  create: (warehouse: IWarehouse) => void;
  update: (id: number, warehouse:IWarehouse) => Promise<IWarehouse|undefined>;
  remove: (id: number) => Promise<number|undefined>;
  getById: (id: number) => Promise<IWarehouse|undefined>;
};

export const WarehouseContext = React.createContext<IWarehouseContextType>({} as IWarehouseContextType,);

interface Props {
  children: React.ReactNode;
}

const WarehouseProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {

  const warehouseList = React.useCallback(
    async () => {
      const result = await get();
      return result;
    },
    [],
  );

  const create = React.useCallback(
    async (warehouse: IWarehouse) => {
      console.log('create warehouse context =', warehouse);
      const result = await post(warehouse);
      console.log('result create warehouse context =', result);
      return result;
    }, 
    []
  );

  const update = React.useCallback(
    async (id: number, warehouse: IWarehouse) => {
      console.log('Update warehouse context =', warehouse);
      const result = await put(id, warehouse);
      console.log('result create warehouse context =', result);
      return result;
    }, 
    []
  );

  const remove = React.useCallback(
    async (id: number) => {
      console.log('Update warehouse context =', id);
      const result = await del(id);
      console.log('result create warehouse context =', result);
      return id;
    }, 
    []
  );

  const getById = React.useCallback(
    async (id: number) => {
      console.log('Update warehouse context =', id);
      const result = await getSingle(id);
      console.log('result create warehouse context =', result);
      return result;
    }, 
    []
  );

  
  return (
    <WarehouseContext.Provider 
      value={{ 
        warehouseList, 
        create, 
        update, 
        remove,
        getById }}>
      {children}
    </WarehouseContext.Provider>
  );
}

function useWarehouse(): IWarehouseContextType {
  const context = React.useContext(WarehouseContext);

  if (!context) {
    throw new Error(' ------------------ ');
  }

  return context;
}

export { useWarehouse, WarehouseProvider };
