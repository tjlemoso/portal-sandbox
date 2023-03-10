import { IClient } from './../interface/IClient';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    // const response = await axiosInstance.get<IClient[]>('/client');
    // console.log('response', response.data);
    // return response.data;
    return [
      {
      "clientId": 8,
      "createData": null,
      "name": "Client DF",
      "phone": "(568) 990-5931",
      "email": "clientedf@email.com",
      "address": "Lago Sul",
      "address2": "",
      "city": "Brasília",
      "state": "DF",
      "zip": "71608-900",
      "country": "Brazil"
      },
      {
      "clientId": 7,
      "createData": null,
      "name": "Client RN",
      "phone": "(466) 803-5955",
      "email": "clientern@email.com",
      "address": "Av. Dr. Ruy Pereira dos Santos, 3100",
      "address2": "",
      "city": " São Gonçalo do Amarante",
      "state": " RN",
      "zip": " 59290-000",
      "country": "Brazil"
      },
      {
      "clientId": 9,
      "createData": null,
      "name": "Cliente RO",
      "phone": "(951) 417-2547",
      "email": "clientero@email.com",
      "address": "Av. Gov. Jorge Teixeira",
      "address2": "",
      "city": "Porto Velho",
      "state": "RO",
      "zip": "76803-970",
      "country": "Brazil"
      },
      {
      "clientId": 10,
      "createData": null,
      "name": "Cliente RS",
      "phone": "(371) 856-0209",
      "email": "clienters@email.com",
      "address": "Av. Severo Dullius, 90.010",
      "address2": "",
      "city": "Porto Alegre",
      "state": "RS",
      "zip": "90200-310",
      "country": "Brasil"
      }
      ];
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