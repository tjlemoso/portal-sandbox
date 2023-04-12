import { IDelivery } from './../interface/IDelivery';
import axiosInstance from '../config/axios/axiosInstance';
import { LINK_DELIVERY_SERVICE } from '@/config/constants';

export async function get() {
  try {
    const response = await axiosInstance.get<IDelivery[]>(`${LINK_DELIVERY_SERVICE}/delivery`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IDelivery>(`${LINK_DELIVERY_SERVICE}/delivery/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(delivery: IDelivery) {
  try {
    const response = await axiosInstance.post<IDelivery>(`${LINK_DELIVERY_SERVICE}/delivery`,{...delivery});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, delivery: IDelivery) {
  try {
    const response = await axiosInstance.put<IDelivery>(`${LINK_DELIVERY_SERVICE}/delivery/${id}`,{...delivery});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`${LINK_DELIVERY_SERVICE}/delivery/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}