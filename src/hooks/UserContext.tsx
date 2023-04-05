import * as React from 'react';
import { IUser } from "@/interface/IUser";
import { del, get, post, put, getSingle, makeLogin } from "@/services/UserService";
import { setCookie, parseCookies } from 'nookies'

export interface IUserContextType {
  userList: () => Promise<IUser[]>;
  create: (user: IUser) => void;
  update: (id: number, user:IUser) => Promise<IUser>;
  remove: (id: number) => Promise<number>;
  getById: (id: number) => Promise<IUser>;
  login: (email: string, password: string) => Promise<IUser>;
  user: IUser;
  IsAutheticated: boolean;
};

interface AuthState {
  token: string;
}

export const UserContext = React.createContext<IUserContextType>({} as IUserContextType,);

interface Props {
  children: React.ReactNode;
}

const UserProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {

  const [user, setUser] = React.useState<IUser | null>(null);

  const IsAutheticated = !!user;
  React.useEffect(() => {
    const { 'token': token } = parseCookies();

  }, [])

  const userList = React.useCallback(
    async () => {
      const result = await get();
      return result;
    },
    [],
  );

  const create = React.useCallback(
    async (user: IUser) => {
      console.log('create user context =', user);
      const result = await post(user);
      console.log('result create user context =', result);
      return result;
    }, 
    []
  );

  const update = React.useCallback(
    async (id: number, user: IUser) => {
      console.log('Update user context =', user);
      const result = await put(id, user);
      console.log('result create user context =', result);
      return result;
    }, 
    []
  );

  const remove = React.useCallback(
    async (id: number) => {
      console.log('Update user context =', id);
      const result = await del(id);
      console.log('result create user context =', result);
      //return result;
    }, 
    []
  );

  const getById = React.useCallback(
    async (id: number) => {
      console.log('Update user context =', id);
      const result = await getSingle(id);
      console.log('result create user context =', result);
      return result;
    }, 
    []
  );

  const login = React.useCallback(
    async (name: string, password: string) => {
      console.log('Update user context =', name);
      console.log('Update user context =', password);
      const result = await makeLogin(name, password);      
      console.log('result create user context =', result);
      setCookie(undefined, 'token', result?.token!, {
        maxAge: 60 * 60 * 1, //1 hour
      })
  
      setUser(user);
      localStorage.setItem("userInfo", JSON.stringify(user));
      return result;
    }, 
    [user]
  );

  const [data, setData] = React.useState<AuthState>(
    () =>
      ({} as AuthState),
  );

  const logout = React.useCallback(() => {
    localStorage.removeItem('accessToken');
    setData({} as AuthState);
  }, []);


  
  return (
    <UserContext.Provider 
      value={{ 
        userList, 
        create, 
        update, 
        remove,
        getById,
        login,
        IsAutheticated,
        user }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser(): IUserContextType {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error(' ------------------ ');
  }

  return context;
}

export { useUser, UserProvider };
