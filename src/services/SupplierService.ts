import { ISupplier } from './../interface/ISupplier';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    const response = await axiosInstance.get<ISupplier[]>('/supplier');
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<ISupplier>(`/supplier/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(supplier: ISupplier) {
  try {
    const response = await axiosInstance.post<ISupplier>('/supplier',{...supplier});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, supplier: ISupplier) {
  try {
    const response = await axiosInstance.put<ISupplier>(`/supplier/${id}`,{...supplier});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`/supplier/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}