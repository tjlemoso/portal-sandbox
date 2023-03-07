import { IClient } from './../interface/IClient';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    const response = await axiosInstance.get<IClient[]>('/client');
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IClient>(`/client/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(client: IClient) {
  try {
    const response = await axiosInstance.post<IClient>('/client',{...client});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, client: IClient) {
  try {
    const response = await axiosInstance.put<IClient>(`/client/${id}`,{...client});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`/client/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}