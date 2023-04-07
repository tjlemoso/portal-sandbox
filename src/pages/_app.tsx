import '@/styles/index.css'
import '@/styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'toastr/build/toastr.min.css';
import type { AppProps } from 'next/app'
import AppProvider from '@/hooks';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { destroyCookie, parseCookies } from 'nookies';
import React from 'react';
import router, { useRouter } from 'next/router';

import "./MapPage.css";
import { useLogin } from '@/hooks/LoginContext';


export default function App({ Component, pageProps }: AppProps) {

  const logout = React.useCallback(() => {
    destroyCookie(null, 'token');
    window.location.reload();
  }, []);

  const login = React.useCallback(() => {
    router.push('/signIn');
  }, []);

  const { ['token']: token } = parseCookies();

  const { ['isAdmin']: isAdmin } = parseCookies();

  return (
    <AppProvider>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, visibility:(token? "visible":"collapse") }}
        
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Boa Entrega
          </Typography>
          <nav style={{ display: "contents"}}>
            <Link
                variant="button"
                color="text.primary"
                href="/"
                sx={{ my: 1, mx: 1.5 }}
              >
                Home
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/supplier"
              sx={{ my: 1, mx: 1.5 }}
            >
              Supplier
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/client"
              sx={{ my: 1, mx: 1.5 }}
            >
              Client
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/warehouse"
              sx={{ my: 1, mx: 1.5 }}
            >
              Warehouse
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/product"
              sx={{ my: 1, mx: 1.5 }}
            >
              Product
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/delivery"
              sx={{ my: 1, mx: 1.5 }}
            >
              Delivery
            </Link>

            {
                isAdmin === "yes" ?
                (
                  <Link
                  variant="button"
                  color="text.primary"
                  href="/user"
                  sx={{ my: 1, mx: 1.5 }}
                  >
                    User
                  </Link>
                )
                :
                <></>
            }

                                     
          </nav>
          {/* <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={() =>  login()}>
            Login
          </Button> */}
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </AppProvider>
  );
  
}
