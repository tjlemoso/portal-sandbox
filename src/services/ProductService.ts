import { IProduct } from './../interface/IProduct';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    // const response = await axiosInstance.get<IProduct[]>('/product');
    // console.log('response', response.data);
    return [
      {
      "productId": 1,
      "createData": "2023-03-08",
      "name": "Name",
      "description": "Description",
      "availableQuantity": 10,
      "warehouseId": 2,
      "supplierId": 5
      },
      {
      "productId": 2,
      "createData": "2023-03-08",
      "name": "Product 2",
      "description": "Product 2",
      "availableQuantity": 10,
      "warehouseId": 1,
      "supplierId": 1
      },
      {
      "productId": 3,
      "createData": "2023-03-08",
      "name": "Product 3",
      "description": "Product 3",
      "availableQuantity": 10,
      "warehouseId": 3,
      "supplierId": 5
      }
      ];
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IProduct>(`/product/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(product: IProduct) {
  try {
    const response = await axiosInstance.post<IProduct>('/product',{...product});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, product: IProduct) {
  try {
    const response = await axiosInstance.put<IProduct>(`/product/${id}`,{...product});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`/product/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}