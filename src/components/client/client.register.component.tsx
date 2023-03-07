import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { useClient } from '@/hooks/ClientContext';
import { IClient } from '@/interface/IClient';
import { useSnackbar } from '@mui/base';
import { Paper, Typography } from '@mui/material';

export default function ClientRegisterFormComponent() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create, getById, update } = useClient();
  const { query } = useRouter();
  const [client, setClient] = React.useState<IClient>({} as 
    {
      clientId: 0;
      name: "";
      phone: "";
      email: "";
      address: "";
      address2: "";
      city: "";
      state: "";
      zip: "";
      country: "";
    }
  );

  const handleSubmit= React.useCallback( 
    async (data: IClient) => {
      if (query.id) {
        update(Number(client.clientId),
          {
          clientId: client.clientId,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        }
        );
      } else{        
        create({...data});
      }
      router.push('/client');
    },
    [create, query.id, client.clientId, update],
  );

  const handleBack = async () => {
    router.push('/client');
  };

  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getById(Number(query.id));
        setClient(result);
      }
    };
    validation();
  }, [query, getById, setClient]);


  return (
    <Container component="main">
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}>          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Client
              </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Name</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={client?.name}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Phone Number</label>
              <Input name="phone" 
                autoComplete="family-name"
                defaultValue={client?.phone}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Email</label>
              <Input name="email" 
                autoComplete="family-name"
                defaultValue={client?.email}
                />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Address
                </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Address line 1</label>
                <Input name="address" 
                  autoComplete="family-name"
                  defaultValue={client?.address}
                  />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Address line 2</label>
                <Input name="address2" 
                  autoComplete="family-name"
                  defaultValue={client?.address2}                  
                  />
            </Grid>        
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>City</label>
              <Input name="city" 
                autoComplete="family-name"
                defaultValue={client?.city}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>State/Province/Region</label>
              <Input name="state" 
                autoComplete="family-name"
                defaultValue={client?.state}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Zip / Postal code</label>
              <Input name="zip" 
                autoComplete="family-name"
                defaultValue={client?.zip}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Country</label>
              <Input name="country" 
                autoComplete="family-name"
                defaultValue={client?.country}                
                />
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