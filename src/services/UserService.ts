import { IUser } from './../interface/IUser';
import axiosInstance from '../config/axios/axiosInstance';
import { LINK_USER_SERVICE } from '@/config/constants';

export async function get() {
  try {
    const response = await axiosInstance.get<IUser[]>(`${LINK_USER_SERVICE}/user`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IUser>(`${LINK_USER_SERVICE}/user/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(user: IUser) {
  try {
    const response = await axiosInstance.post<IUser>(`${LINK_USER_SERVICE}/user`,{...user});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, user: IUser) {
  try {
    const response = await axiosInstance.put<IUser>(`${LINK_USER_SERVICE}/user/${id}`,{...user});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`${LINK_USER_SERVICE}/user/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}


export async function makeLogin(name: string, password: string) {
  try {
    const response = await axiosInstance.post<IUser>('/user',{name: name, password: password});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}