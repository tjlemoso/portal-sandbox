import { ISupplier } from './../interface/ISupplier';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    // const response = await axiosInstance.get<ISupplier[]>('/supplier');
    // console.log('response', response.data);
    return [
      {
      "supplierId": 1,
      "createData": "2023-07-03",
      "name": "Inga Simpson ",
      "phone": "(528) 732-2025 ",
      "email": "suspendisse.ac@hotmail.edu ",
      "address": "8642 Auctor Rd. ",
      "address2": "addres 2 ",
      "city": "Waals-Brabant ",
      "state": "statestate ",
      "zip": "88694 ",
      "country": "Belgium "
      },
      {
      "supplierId": 5,
      "createData": "2023-07-03",
      "name": "Kyra Hill",
      "phone": "(631) 876-6761",
      "email": "magna.a@aol.couk",
      "address": "P.O. Box 102, 8433 Amet Street",
      "address2": "addres 2",
      "city": "Stockholms län",
      "state": "state",
      "zip": "6391",
      "country": "Belgium"
      },
      {
      "supplierId": 3,
      "createData": "2023-07-03",
      "name": "Mariko Gutierrez",
      "phone": "1-447-305-6365",
      "email": "pede.blandit.congue@hotmail.ca",
      "address": "Ap #393-2641 Eu Av.",
      "address2": "addres 2",
      "city": "Zeeland",
      "state": "state",
      "zip": "477114",
      "country": "Ireland"
      },
      {
      "supplierId": 2,
      "createData": "2023-07-03",
      "name": "Nash Nicholson",
      "phone": "(474) 622-6264",
      "email": "nec.tempus@aol.net",
      "address": "P.O. Box 631, 4933 Sit Av.",
      "address2": "addres 2",
      "city": "Washington",
      "state": "state",
      "zip": "383233",
      "country": "Russian Federation"
      },
      {
      "supplierId": 4,
      "createData": "2023-07-03",
      "name": "Rama Landry",
      "phone": "1-958-605-0784",
      "email": "risus@outlook.net",
      "address": "804-601 Accumsan Street",
      "address2": "addres 2",
      "city": "Lambayeque",
      "state": "state",
      "zip": "2571",
      "country": "Poland"
      }
      ];
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