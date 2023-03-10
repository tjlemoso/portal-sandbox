import { IWarehouse } from './../interface/IWarehouse';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    // const response = await axiosInstance.get<IWarehouse[]>('/warehouse');
    // console.log('response', response.data);
    // return response.data;    
    return [
      {
      "warehouseId": 12,
      "createData": "2023-03-09",
      "name": "Warehouse Pharmacy MG",
      "phone": "(85) 23823-2591",
      "email": "pharmacy@email.com",
      "address": "LMG-800 Km 7,9 s/n",
      "address2": "",
      "city": "Confins",
      "state": "Minas Gerais",
      "zip": "33500-900",
      "country": "Brazil",
      "supplierId": 8
      },
      {
      "warehouseId": 14,
      "createData": "2023-03-09",
      "name": "Warehouse Pharmacy RJ",
      "phone": "(15) 76377-5838",
      "email": "pharmacy@email.com",
      "address": "Av. Brg. Trompowski, 770 - Galeão",
      "address2": "",
      "city": "Rio de Janeiro",
      "state": "Rio de Janeiro",
      "zip": "21941-590",
      "country": "Brazil",
      "supplierId": 8
      },
      {
      "warehouseId": 13,
      "createData": "2023-03-09",
      "name": "Warehouse Pharmacy SP",
      "phone": "(21) 18544-1165",
      "email": "pharmacy@email.com",
      "address": "SP-019, s/n - Cumbica",
      "address2": "",
      "city": "Guarulhos",
      "state": "São Paulo",
      "zip": "07190-000",
      "country": "Brazil",
      "supplierId": 8
      },
      {
      "warehouseId": 15,
      "createData": "2023-03-09",
      "name": "Warehouse Shopping MG",
      "phone": "(75) 86228-8036",
      "email": "shopping@email.com",
      "address": "LMG-800 Km 7,9 s/n",
      "address2": "",
      "city": "Confins",
      "state": "Minas Gerais",
      "zip": "33500-900",
      "country": "Brazil",
      "supplierId": 9
      },
      {
      "warehouseId": 17,
      "createData": "2023-03-09",
      "name": "Warehouse Shopping RJ",
      "phone": "(85) 23823-2591",
      "email": "shopping@email.com",
      "address": "Av. Brg. Trompowski, 770 - Galeão",
      "address2": "",
      "city": "Rio de Janeiro",
      "state": "Rio de Janeiro",
      "zip": "21941-590",
      "country": "Brazil",
      "supplierId": 9
      },
      {
      "warehouseId": 16,
      "createData": "2023-03-09",
      "name": "Warehouse Shopping SP",
      "phone": "(15) 76377-5838",
      "email": "shopping@email.com",
      "address": "SP-019, s/n - Cumbica",
      "address2": "",
      "city": "Guarulhos",
      "state": "São Paulo",
      "zip": "07190-000",
      "country": "Brazil",
      "supplierId": 9
      },
      {
      "warehouseId": 9,
      "createData": "2023-03-09",
      "name": "Warehouse Supermarket MG",
      "phone": "(15) 76377-5838",
      "email": "supermarket@email.com",
      "address": "LMG-800 Km 7,9 s/n",
      "address2": "",
      "city": "Confins",
      "state": "Minas Gerais",
      "zip": "33500-900",
      "country": "Brazil",
      "supplierId": 7
      },
      {
      "warehouseId": 11,
      "createData": "2023-03-09",
      "name": "Warehouse Supermarket RJ",
      "phone": "(94) 77337-8116",
      "email": "supermarket@email.com",
      "address": "Av. Brg. Trompowski, 770 - Galeão",
      "address2": "",
      "city": "Rio de Janeiro",
      "state": "Rio de Janeiro",
      "zip": "21941-590",
      "country": "Brazil",
      "supplierId": 7
      },
      {
      "warehouseId": 10,
      "createData": "2023-03-09",
      "name": "Warehouse Supermarket SP",
      "phone": "(75) 86228-8036",
      "email": "supermarket@email.com",
      "address": "SP-019, s/n - Cumbica",
      "address2": "",
      "city": "Guarulhos",
      "state": "São Paulo",
      "zip": "07190-000",
      "country": "Brazil",
      "supplierId": 7
      }
      ];
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IWarehouse>(`/warehouse/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.post<IWarehouse>('/warehouse',{...warehouse});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.put<IWarehouse>(`/warehouse/${id}`,{...warehouse});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`/warehouse/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}