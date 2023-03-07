import { IWarehouse } from './../interface/IWarehouse';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    const response = await axiosInstance.get<IWarehouse[]>('/warehouse');
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IWarehouse>(`/warehouse/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.post<IWarehouse>('/warehouse',{...warehouse});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.put<IWarehouse>(`/warehouse/${id}`,{...warehouse});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`/warehouse/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}