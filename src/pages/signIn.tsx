import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import router, { useRouter } from 'next/router';
import { useLogin } from '@/hooks/LoginContext';
import { Alert, CircularProgress } from '@mui/material';

const theme = createTheme();

export interface ILoginType {
  email: string;
  password: string;
}


export default function SignIn() {
  
  const { login } = useLogin();
  const [showAlert, setShowAlert] = React.useState(false);
  const [athentication, setAthentication] = React.useState(false);

  athentication

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();    
    const formData = new FormData(event.currentTarget);
      
    const data: ILoginType = {
      // @ts-ignore
      email: formData.get('email')?.toString(),
      // @ts-ignore
      password: formData.get('password')?.toString(),
    };
    setAthentication(true);
    const result = await login(data.email, data.password);
    setAthentication(false);
    console.log("result",result)

    if (result && result.authenticated) {      
       
      router.push('/');      

    } else {

      console.log('To do create form to send email again!');
      setShowAlert(true);
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {
              showAlert ?
              (<Alert severity="error">Error logging in, wrong username and password. Please enter the correct user information!</Alert>)
              : <></>
            }
            {
              athentication ?
              (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              )
              : <></>
            }
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}