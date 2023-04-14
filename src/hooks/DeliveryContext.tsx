import * as React from 'react';
import { IDelivery } from "@/interface/IDelivery";
import { del, get, post, put, getSingle } from "@/services/DeliveryService";

export interface IDeliveryContextType {
  deliveryList: () => Promise<IDelivery[]|undefined>;
  create: (delivery: IDelivery) => void;
  update: (id: number, delivery:IDelivery) => Promise<IDelivery|undefined>;
  remove: (id: number) => Promise<number|undefined>;
  getById: (id: number) => Promise<IDelivery|undefined>;
};

export const DeliveryContext = React.createContext<IDeliveryContextType>({} as IDeliveryContextType,);

interface Props {
  children: React.ReactNode;
}

const DeliveryProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {

  const deliveryList = React.useCallback(
    async () => {
      const result = await get();
      return result;
    },
    [],
  );

  const create = React.useCallback(
    async (delivery: IDelivery) => {
      console.log('create delivery context =', delivery);
      const result = await post(delivery);
      console.log('result create delivery context =', result);
      return result;
    }, 
    []
  );

  const update = React.useCallback(
    async (id: number, delivery: IDelivery) => {
      console.log('Update delivery context =', delivery);
      const result = await put(id, delivery);
      console.log('result create delivery context =', result);
      return result;
    }, 
    []
  );

  const remove = React.useCallback(
    async (id: number) => {
      console.log('Update delivery context =', id);
      const result = await del(id);
      console.log('result create delivery context =', result);
      return id;
    }, 
    []
  );

  const getById = React.useCallback(
    async (id: number) => {
      console.log('Update delivery context =', id);
      const result = await getSingle(id);
      console.log('result create delivery context =', result);
      return result;
    }, 
    []
  );

  
  return (
    <DeliveryContext.Provider 
      value={{ 
        deliveryList, 
        create, 
        update, 
        remove,
        getById }}>
      {children}
    </DeliveryContext.Provider>
  );
}

function useDelivery(): IDeliveryContextType {
  const context = React.useContext(DeliveryContext);

  if (!context) {
    throw new Error(' ------------------ ');
  }

  return context;
}

export { useDelivery, DeliveryProvider };
