import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { useWarehouse } from '@/hooks/WarehouseContext';
import { IWarehouse } from '@/interface/IWarehouse';
import { useSnackbar } from '@mui/base';
import { Paper, Typography } from '@mui/material';

export default function WarehouseRegisterFormComponent() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create, getById, update } = useWarehouse();
  const { query } = useRouter();
  const [warehouse, setWarehouse] = React.useState<IWarehouse>({} as 
    {
      warehouseId: 0;
      name: "";
      phone: "";
      email: "";
      address: "";
      address2: "";
      city: "";
      state: "";
      zip: "";
      country: "";
      supplierId: 0;
    }
  );

  const handleSubmit= React.useCallback( 
    async (data: IWarehouse) => {
      if (query.id) {
        update(Number(warehouse.warehouseId),
          {
          warehouseId: warehouse.warehouseId,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
          supplierId: 0,
        }
        );
      } else{        
        create({...data});
      }
      router.push('/warehouse');
    },
    [create, query.id, warehouse.warehouseId, update],
  );

  const handleBack = async () => {
    router.push('/warehouse');
  };

  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getById(Number(query.id));
        setWarehouse(result);
      }
    };
    validation();
  }, [query, getById, setWarehouse]);


  return (
    <Container component="main">
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}>          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Warehouse
              </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Name</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={warehouse?.name}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Phone Number</label>
              <Input name="phone" 
                autoComplete="family-name"
                defaultValue={warehouse?.phone}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Email</label>
              <Input name="email" 
                autoComplete="family-name"
                defaultValue={warehouse?.email}
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
                  defaultValue={warehouse?.address}
                  />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Address line 2</label>
                <Input name="address2" 
                  autoComplete="family-name"
                  defaultValue={warehouse?.address2}                  
                  />
            </Grid>        
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>City</label>
              <Input name="city" 
                autoComplete="family-name"
                defaultValue={warehouse?.city}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>State/Province/Region</label>
              <Input name="state" 
                autoComplete="family-name"
                defaultValue={warehouse?.state}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Zip / Postal code</label>
              <Input name="zip" 
                autoComplete="family-name"
                defaultValue={warehouse?.zip}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Country</label>
              <Input name="country" 
                autoComplete="family-name"
                defaultValue={warehouse?.country}                
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