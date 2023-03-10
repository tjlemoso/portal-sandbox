import { ISupplier } from './../interface/ISupplier';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    // const response = await axiosInstance.get<ISupplier[]>('/supplier');
    // console.log('response', response.data);
    // return response.data;
    return [
      {
      "supplierId": 8,
      "createData": "2023-03-09",
      "name": "Pharmacy",
      "phone": "(222) 222-2222",
      "email": "pharmacy@email.com",
      "address": "SP-019, s/n - Cumbica",
      "address2": "",
      "city": "Guarulhos",
      "state": "São Paulo",
      "zip": "07190-000",
      "country": "Brazil"
      },
      {
      "supplierId": 9,
      "createData": "2023-03-09",
      "name": "Shopping",
      "phone": "(333) 333-3333",
      "email": "shopping@email.com",
      "address": "Av. Brg. Trompowski, 770 - Galeão",
      "address2": "",
      "city": "Rio de Janeiro",
      "state": "Rio de Janeiro",
      "zip": "21941-590",
      "country": "Brazil"
      },
      {
      "supplierId": 7,
      "createData": "2023-03-09",
      "name": "Supermarket",
      "phone": "(111) 111-1111",
      "email": "supermarket@email.com",
      "address": "LMG-800 Km 7,9 s/n",
      "address2": "",
      "city": "Confins",
      "state": "Minas Gerais",
      "zip": "33500-900",
      "country": "Brazil"
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