import * as React from 'react';

import { setCookie, parseCookies } from 'nookies'
import { ILogin } from '@/interface/ILogin';
import { authenticate } from '@/services/LoginService';
import { IUser } from '@/interface/IUser';

export interface ILoginContextType {
  login: (email: string, password: string) => Promise<ILogin>;
  logout(): void;
  userLogin: ILogin;
};

interface AuthState {
  token: string;
}

export const LoginContext = React.createContext<ILoginContextType>({} as ILoginContextType,);

interface Props {
  children: React.ReactNode;
}

const LoginProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {

  const [userLogin, setLogin] = React.useState<IUser | null>(null);

  const IsAutheticated = !!userLogin;

  const [data, setData] =  React.useState<AuthState>(
    () =>

      ({} as AuthState),
  );


  const login = React.useCallback(
    async (name: string, password: string) => {
      const result = await authenticate(name, password);      

      setCookie(undefined, 'token', result?.token, {
        maxAge: 60 * 60 * 1, //1 hour
      })

      const { ['token']: token } = parseCookies();

      console.log("token",token)

      if(result.authenticated){        

        setLogin(result.user);
        localStorage.setItem("userInfo", JSON.stringify(result));
        return result;
      }

      return null;

    }, 
    []
  );

  const logout = React.useCallback(() => {
    localStorage.removeItem('accessToken');
    setData({} as AuthState);
  }, []);


  
  return (
    <LoginContext.Provider 
      value={{ 
        login,
        logout,
        IsAutheticated,
        userLogin }}>
      {children}
    </LoginContext.Provider>
  );
}

function useLogin(): ILoginContextType {
  const context = React.useContext(LoginContext);

  if (!context) {
    throw new Error(' ------------------ ');
  }

  return context;
}

export { useLogin, LoginProvider };
