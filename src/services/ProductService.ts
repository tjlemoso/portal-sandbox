import { IProduct } from './../interface/IProduct';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    // const response = await axiosInstance.get<IProduct[]>('/product');
    // console.log('response', response.data);
    // return response.data;
    return [
      {
      "productId": 5,
      "createData": "2023-03-09",
      "name": "Anti-inflammatory",
      "description": "Anti-inflammatory",
      "availableQuantity": 100,
      "warehouseId": 14,
      "supplierId": 1
      },
      {
      "productId": 4,
      "createData": "2023-03-09",
      "name": "Dipyrone",
      "description": "Dipyrone",
      "availableQuantity": 100,
      "warehouseId": 14,
      "supplierId": 1
      },
      {
      "productId": 6,
      "createData": "2023-03-09",
      "name": "Refrigerator",
      "description": "Refrigerator",
      "availableQuantity": 10,
      "warehouseId": 17,
      "supplierId": 9
      },
      {
      "productId": 7,
      "createData": "2023-03-09",
      "name": "Refrigerator",
      "description": "Refrigerator",
      "availableQuantity": 100,
      "warehouseId": 16,
      "supplierId": 9
      },
      {
      "productId": 10,
      "createData": "2023-03-09",
      "name": "sofa",
      "description": "sofa",
      "availableQuantity": 10,
      "warehouseId": 15,
      "supplierId": 9
      },
      {
      "productId": 8,
      "createData": "2023-03-09",
      "name": "Tv 32 inches",
      "description": "Tv 32 inches",
      "availableQuantity": 100,
      "warehouseId": 17,
      "supplierId": 9
      },
      {
      "productId": 9,
      "createData": "2023-03-09",
      "name": "Tv 32 inches",
      "description": "Tv 32 inches",
      "availableQuantity": 10,
      "warehouseId": 16,
      "supplierId": 9
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