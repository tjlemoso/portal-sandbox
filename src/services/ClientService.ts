import { IClient } from './../interface/IClient';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    // const response = await axiosInstance.get<IClient[]>('/client');
    // console.log('response', response.data);
    return [
      {
      "clientId": 1,
      "createData": "2023-07-03",
      "name": "Abigail Norman",
      "phone": "(448) 785-3677",
      "email": "cubilia.curae.phasellus@aol.edu",
      "address": "6592 Magna Ave",
      "address2": null,
      "city": "Zamboanga Peninsula",
      "state": null,
      "zip": "2440 HJ",
      "country": "Peru"
      },
      {
      "clientId": 4,
      "createData": "2023-07-03",
      "name": "Emerald Rodriquez",
      "phone": "1-568-850-7817",
      "email": "sed@google.couk",
      "address": "732-6716 Dui. Rd.",
      "address2": null,
      "city": "Gyeonggi",
      "state": null,
      "zip": "170832",
      "country": "Pakistan"
      },
      {
      "clientId": 5,
      "createData": "2023-07-03",
      "name": "Keith Wood",
      "phone": "(647) 145-5109",
      "email": "maecenas@icloud.edu",
      "address": "3533 Et Rd.",
      "address2": null,
      "city": "Leinster",
      "state": null,
      "zip": "35122",
      "country": "Netherlands"
      },
      {
      "clientId": 2,
      "createData": "2023-07-03",
      "name": "Marshall West",
      "phone": "(645) 339-6455",
      "email": "sit.amet@yahoo.net",
      "address": "7519 Dapibus St.",
      "address2": null,
      "city": "Zaporizhzhia oblast",
      "state": null,
      "zip": "4791-1139",
      "country": "Vietnam"
      },
      {
      "clientId": 3,
      "createData": "2023-07-03",
      "name": "Zephania Ward",
      "phone": "(649) 928-3515",
      "email": "eu.eros@icloud.ca",
      "address": "Ap #673-4035 Laoreet Rd.",
      "address2": null,
      "city": "Paraná",
      "state": null,
      "zip": "633855",
      "country": "Sweden"
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