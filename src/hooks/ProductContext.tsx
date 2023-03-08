import * as React from 'react';
import { IProduct } from "@/interface/IProduct";
import { del, get, post, put, getSingle } from "@/services/ProductService";

export interface IProductContextType {
  productList: () => Promise<IProduct[]>;
  create: (product: IProduct) => void;
  update: (id: number, product:IProduct) => Promise<IProduct>;
  remove: (id: number) => Promise<number>;
  getById: (id: number) => Promise<IProduct>;
};

export const ProductContext = React.createContext<IProductContextType>({} as IProductContextType,);

interface Props {
  children: React.ReactNode;
}

const ProductProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {

  const productList = React.useCallback(
    async () => {
      const result = await get();
      return result;
    },
    [],
  );

  const create = React.useCallback(
    async (product: IProduct) => {
      console.log('create product context =', product);
      const result = await post(product);
      console.log('result create product context =', result);
      return result;
    }, 
    []
  );

  const update = React.useCallback(
    async (id: number, product: IProduct) => {
      console.log('Update product context =', product);
      const result = await put(id, product);
      console.log('result create product context =', result);
      return result;
    }, 
    []
  );

  const remove = React.useCallback(
    async (id: number) => {
      console.log('Update product context =', id);
      const result = await del(id);
      console.log('result create product context =', result);
      //return result;
    }, 
    []
  );

  const getById = React.useCallback(
    async (id: number) => {
      console.log('Update product context =', id);
      const result = await getSingle(id);
      console.log('result create product context =', result);
      return result;
    }, 
    []
  );

  
  return (
    <ProductContext.Provider 
      value={{ 
        productList, 
        create, 
        update, 
        remove,
        getById }}>
      {children}
    </ProductContext.Provider>
  );
}

function useProduct(): IProductContextType {
  const context = React.useContext(ProductContext);

  if (!context) {
    throw new Error(' ------------------ ');
  }

  return context;
}

export { useProduct, ProductProvider };
