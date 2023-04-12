import { IWarehouse } from './../interface/IWarehouse';
import axiosInstance from '../config/axios/axiosInstance';
import { LINK_WAREHOUSE_SERVICE } from '@/config/constants';

export async function get() {
  try {
    const response = await axiosInstance.get<IWarehouse[]>(`${LINK_WAREHOUSE_SERVICE}/warehouse`);
    console.log('response', response.data);
    return response.data;    

  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IWarehouse>(`${LINK_WAREHOUSE_SERVICE}/warehouse/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.post<IWarehouse>(`${LINK_WAREHOUSE_SERVICE}/warehouse`,{...warehouse});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.put<IWarehouse>(`${LINK_WAREHOUSE_SERVICE}/warehouse/${id}`,{...warehouse});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`${LINK_WAREHOUSE_SERVICE}/warehouse/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}