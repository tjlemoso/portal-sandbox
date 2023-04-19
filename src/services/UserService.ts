import { IUser } from './../interface/IUser';
import axiosInstance from '../config/axios/axiosInstance';
import { LINK_USER_SERVICE } from '@/config/constants';

export async function getUsers() {
  try {
    const response = await axiosInstance.get<IUser[]>(`${LINK_USER_SERVICE}/user`);
    console.log('response getUsers', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function getUserById(id: number) {
  try {
    const response = await axiosInstance.get<IUser>(`${LINK_USER_SERVICE}/user/id/${id}`);
    console.log('response getUserById', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function createUser(user: IUser) {
  try {
    const response = await axiosInstance.post<IUser>(`${LINK_USER_SERVICE}/user`,{...user});
    console.log('response createUser', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function updateUser(id: number, user: IUser) {
  try {
    const response = await axiosInstance.put<IUser>(`${LINK_USER_SERVICE}/user/${id}`,{...user});
    console.log('response updateUser', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await axiosInstance.delete(`${LINK_USER_SERVICE}/user/${id}`);
    console.log('response deleteUser', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}
