import { IDelivery } from './../interface/IDelivery';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    const response = await axiosInstance.get<IDelivery[]>('/delivery');
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IDelivery>(`/delivery/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(delivery: IDelivery) {
  try {
    const response = await axiosInstance.post<IDelivery>('/delivery',{...delivery});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, delivery: IDelivery) {
  try {
    const response = await axiosInstance.put<IDelivery>(`/delivery/${id}`,{...delivery});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`/delivery/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}