import { IClient } from './../interface/IClient';
import axiosInstance from '../config/axios/axiosInstance';
import { LINK_CLIENT_SERVICE } from '@/config/constants';

export async function get() {
  try {
    const response = await axiosInstance.get<IClient[]>(`${LINK_CLIENT_SERVICE}/client`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IClient>(`${LINK_CLIENT_SERVICE}/client/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(client: IClient) {
  try {
    const response = await axiosInstance.post<IClient>(`${LINK_CLIENT_SERVICE}/client`,{...client});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, client: IClient) {
  try {
    const response = await axiosInstance.put<IClient>(`${LINK_CLIENT_SERVICE}/client/${id}`,{...client});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`${LINK_CLIENT_SERVICE}/client/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}