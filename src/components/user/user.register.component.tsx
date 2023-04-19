import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { IUser } from '@/interface/IUser';
import {Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import { createUser, getUserById, updateUser } from '@/services/UserService';
import AlertDialog from '../share/message';
import SimpleBackdrop from '../share/backdrop';


export interface IProsUser {
  user: IUser;
}

const UserRegisterForm: React.FunctionComponent<IProsUser> = props => {

  const formRef = React.useRef<FormHandles>(null); 
  const { query } = useRouter();
  const [user, setUser] = React.useState<IUser>(props.user);
  const optionsUser = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Operador' }
  ]
  const [selectUser, setSelectUser] = React.useState(props.user.isAdmin? 1 : 2);
  const [open, setOpen] = React.useState(false);
  const [openLoadding, setOpenLoadding] = React.useState(false);

  const handleSubmit= React.useCallback( 
    async (data: IUser) => {

      setOpenLoadding(true);
      if (query.id) {
        await updateUser(Number(user.userId),
          {
            userId: user.userId,
            name: data.name,
            password: data.password,
            isAdmin: selectUser === 1 ? true : false,
        }
        );
      } else {   
        
        await createUser(
          {
            ...data,
            isAdmin: selectUser === 1 ? true : false,
          });
      }
      setOpenLoadding(false);
      setOpen(true);
    },
    [selectUser, query.id, user.userId],
  );

  const handleBack = async () => {
    router.push('/user');
  };

  return (
    <Container component="main">
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
       <AlertDialog openDialog={open} handleClose={handleBack}/>
        <SimpleBackdrop openComponent={openLoadding} />             
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={1}>          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Usuário
              </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Nome</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={user?.name}
                />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Password</label>
              <Input name="password"
                type={"password"} 
                autoComplete="family-name"
                defaultValue={user?.password}
                />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
            <label>Tipo de usuário</label>
            <select value={selectUser} onChange={e => setSelectUser(Number(e.target.value))}>
              {
                optionsUser && optionsUser.length > 0 ? 
                  (
                    optionsUser.map((item, index) => (
                      <option 
                        value={item.id}
                        key={item.id}
                        >
                        {item.label}
                      </option>
                    )) 
                  ) : 
                  (
                    <option 
                    value={0}
                    key={0}
                    >
                   0
                  </option>
                  )
            }        
            </select>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin:1 }}>                
                  <Button  sx={{ mt: 3, ml: 1 }} onClick={handleBack}>
                    Voltar
                  </Button>        
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                  >
                   Confirmar
                  </Button>          
                </Box>
            </Grid>  
          </Grid>        
        </Form>
      </Paper>
    </Container>
  );
}

export default UserRegisterForm;