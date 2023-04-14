import * as React from 'react';
import { IClient } from "@/interface/IClient";
import { del, get, post, put, getSingle } from "@/services/ClientService";

export interface IClientContextType {
  clientList: () => Promise<IClient[]|undefined>;
  create: (client: IClient) => void;
  update: (id: number, client:IClient) => Promise<IClient|undefined>;
  remove: (id: number) => Promise<number|undefined>;
  getById: (id: number) => Promise<IClient|undefined>;
};

export const ClientContext = React.createContext<IClientContextType>({} as IClientContextType,);

interface Props {
  children: React.ReactNode;
}

const ClientProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {

  const clientList = React.useCallback(
    async () => {
      const result = await get();
      return result;
    },
    [],
  );

  const create = React.useCallback(
    async (client: IClient) => {
      console.log('create client context =', client);
      const result = await post(client);
      console.log('result create client context =', result);
      return result;
    }, 
    []
  );

  const update = React.useCallback(
    async (id: number, client: IClient) => {
      console.log('Update client context =', client);
      const result = await put(id, client);
      console.log('result create client context =', result);
      return result;
    }, 
    []
  );

  const remove = React.useCallback(
    async (id: number) => {
      console.log('Update client context =', id);
      const result = await del(id);
      console.log('result create client context =', result);
      return id;
    }, 
    []
  );

  const getById = React.useCallback(
    async (id: number) => {
      console.log('Update client context =', id);
      const result = await getSingle(id);
      console.log('result create client context =', result);
      return result;
    }, 
    []
  );

  
  return (
    <ClientContext.Provider 
      value={{ 
        clientList, 
        create, 
        update, 
        remove,
        getById }}>
      {children}
    </ClientContext.Provider>
  );
}

function useClient(): IClientContextType {
  const context = React.useContext(ClientContext);

  if (!context) {
    throw new Error(' ------------------ ');
  }

  return context;
}

export { useClient, ClientProvider };
