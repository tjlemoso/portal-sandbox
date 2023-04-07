import { ILogin } from './../interface/ILogin';
import axiosInstance from '../config/axios/axiosInstance';

export async function authenticate(name: string, password: string) {
    // try {
    //   const response = await axiosInstance.post<ILogin>(`/authenticator/${name}/password/${password}`);
    //   console.log('response', response.data);
    //   return response.data;
    // } catch(err) {
    //   console.error(err);
    // }

    return {
        "user": {
            "userId": 3,
            "name": "adminEmail",
            "password": "adminSenha",
            "isAdmin": true
        },
        "token": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlivFI8qB4D0y2jy0CfEqFyy46R0o7S8TKpsx5xbHKoU1VWg6QkQm+ntyIv1p4kE1sPEQO73+HY8+Bzs75XwRTYL1BmR1w8J5hmjVWjc6R2BTBGAYRPFRhor3kpM6ni2SPmNNhurEAHw7TaqszP5eUF/F9+KEBWkwVta+PZ37bwqSE4sCb1soZFrVz/UT/LF4tYpuVYt3YbqToZ3pZOZ9AX2o1GCG3xwOjkc4x0W7ezbQZdC9iftPxVHR8irOijJRRjcPDtA6vPKpzLl6CyYnsIYPd99ltwxTHjr3npfv/3Lw50bAkbT4HeLFxTx4flEoZLKO/g0bAoV2uqBhkA9xnQIDAQAB",
        "authenticated": true
    };

    // return {
    //     "user": null,
    //     "token": null,
    //     "authenticated": false
    // };
    
  }