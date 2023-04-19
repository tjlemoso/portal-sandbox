import * as React from "react";

import { setCookie, parseCookies, destroyCookie } from "nookies";
import { ILogin } from "@/interface/ILogin";
import { authenticate } from "@/services/LoginService";
import { IUser } from "@/interface/IUser";

export interface ILoginContextType {
  login: (email: string, password: string) => Promise<ILogin | undefined>;
  logout(): void;
  userLogin: ILogin | null;
}

interface AuthState {
  token: string;
}

export const LoginContext = React.createContext<ILoginContextType>(
  {} as ILoginContextType
);

interface Props {
  children: React.ReactNode;
}

const LoginProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const [userLogin, setLogin] = React.useState<ILogin | null>(null);

  const [data, setData] = React.useState<AuthState>(() => ({} as AuthState));

  const login = React.useCallback(async (name: string, password: string) => {
    destroyCookie(null, "token");

    const result = await authenticate(name, password);

    if (result?.token) {
      setCookie(undefined, "token", result?.token, {
        maxAge: 60 * 60 * 1, //1 hour
      });
    }

    setCookie(undefined, "isAdmin", result?.user.isAdmin ? "yes" : "no", {
      maxAge: 60 * 60 * 1, //1 hour
    });

    if (result?.authenticated) {
      setLogin(result);
      localStorage.setItem("userInfo", JSON.stringify(result));
      return result;
    }

    return result;
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem("accessToken");
    setData({} as AuthState);
    setLogin(null);
    destroyCookie(null, "token");
    destroyCookie(null, "isAdmin");
  }, []);

  return (
    <LoginContext.Provider
      value={{
        login,
        logout,
        userLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

function useLogin(): ILoginContextType {
  const context = React.useContext(LoginContext);

  if (!context) {
    throw new Error(" ------------------ ");
  }

  return context;
}

export { useLogin, LoginProvider };
