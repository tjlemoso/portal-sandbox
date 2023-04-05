import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { useUser } from '@/hooks/UserContext';
import { IUser } from '@/interface/IUser';
import {Paper, Typography } from '@mui/material';




export default function UserRegisterFormComponent() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create, getById, update } = useUser();
  const { query } = useRouter();
  const [user, setUser] = React.useState<IUser>({} as 
    {
      userId: 0,
      name: "",
      password: "",
      isAdmin: false,
      token: ""
    }
  );
  const optionsUser = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Worker' }
  ]
  const [selectUser, setSelectUser] = React.useState(1);
  const handleSetSelectUser = async (userId: number) => {
    console.log("\n\n user userId {} \n\n", userId)
    setSelectUser(userId);
    console.log("\n\n user selectUser {} \n\n", selectUser)
  };

  React.useEffect(() => {
    if (query.id) {
    setSelectUser(user.isAdmin? 1 : 2);
    }
  }, [query.id, user.isAdmin])

  const handleSubmit= React.useCallback( 
    async (data: IUser) => {

      console.log("\n\n handleSubmit {} \n\n", selectUser)   

      if (query.id) {
        update(Number(user.userId),
          {
            userId: user.userId,
            name: data.name,
            password: data.password,
            isAdmin: selectUser === 1 ? true : false,
            token: ""
        }
        );
      } else {   
        
        create(
          {
            ...data,
            isAdmin: selectUser === 1 ? true : false,
          });
      }
      router.push('/user');
    },
    [selectUser, query.id, update, user.userId, create],
  );

  const handleBack = async () => {
    router.push('/user');
  };

  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getById(Number(query.id));
        setUser(result);
      }
    };
    validation();
  }, [query, getById, setUser]);


  return (
    <Container component="main">
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}>          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                User
              </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Name</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={user?.name}
                />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Passwaord</label>
              <Input name="password"
                type={"password"} 
                autoComplete="family-name"
                defaultValue={user?.password}
                />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
            <label>User type</label>
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
                    Back
                  </Button>        
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Register
                  </Button>          
                </Box>
            </Grid>  
          </Grid>        
        </Form>
      </Paper>
    </Container>
  );
}