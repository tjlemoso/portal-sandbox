import { IProduct } from './../interface/IProduct';
import axiosInstance from '../config/axios/axiosInstance';
import { LINK_PRODUCT_SERVICE } from '@/config/constants';

export async function get() {
  try {
    const response = await axiosInstance.get<IProduct[]>(`${LINK_PRODUCT_SERVICE}/product`);
    console.log('response', response.data);
    return response.data;

  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IProduct>(`${LINK_PRODUCT_SERVICE}/product/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(product: IProduct) {
  try {
    const response = await axiosInstance.post<IProduct>(`${LINK_PRODUCT_SERVICE}/product`,{...product});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, product: IProduct) {
  try {
    const response = await axiosInstance.put<IProduct>(`${LINK_PRODUCT_SERVICE}/product/${id}`,{...product});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`${LINK_PRODUCT_SERVICE}/product/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}