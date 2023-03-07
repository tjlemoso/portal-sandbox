import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { useSupplier } from '@/hooks/SupplierContext';
import { ISupplier } from '@/interface/ISupplier';
import { useSnackbar } from '@mui/base';
import { Paper, Typography } from '@mui/material';

export default function SupplierRegisterFormComponent() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create, getById, update } = useSupplier();
  const { query } = useRouter();
  const [supplier, setSupplier] = React.useState<ISupplier>({} as 
    {
      supplierId: 0;
      name: "";
      phone: "";
      email: "";
      identity: "";
      description: "";
      addressId: 0;
    }
  );

  const handleSubmit= React.useCallback( 
    async (data: ISupplier) => {
      if (query.id) {
        update(Number(supplier.supplierId),
          {
          supplierId: supplier.supplierId,
          name: data.name,
          phone: data.phone,
          email: data.email,
          identity: data.identity,
          description: data.description,
          addressId: 0
        }
        );
      } else{        
        create({...data});
      }
      router.push('/supplier');
    },
    [create, query.id, supplier.supplierId, update],
  );

  const handleBack = async () => {
    router.push('/supplier');
  };

  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getById(Number(query.id));
        setSupplier(result);
      }
    };
    validation();
  }, [query, getById, setSupplier]);


  return (
    <Container component="main"  sx={{ mb: 4 }}>
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}  >          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Supplier
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Name</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={supplier?.name}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Phone Number</label>
              <Input name="phone" 
                autoComplete="family-name"
                defaultValue={supplier?.phone}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Email</label>
              <Input name="email" 
                autoComplete="family-name"
                defaultValue={supplier?.email}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Identity</label>
              <Input name="identity" 
                autoComplete="family-name"
                defaultValue={supplier?.identity}
                />
            </Grid>     
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Description</label>
                <Input name="description" 
                  autoComplete="family-name"
                  defaultValue={supplier?.description}
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
                  />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Address line 2</label>
                <Input name="address2" 
                  autoComplete="family-name"
                  />
            </Grid>        
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>City</label>
              <Input name="city" 
                autoComplete="family-name"
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>State/Province/Region</label>
              <Input name="state" 
                autoComplete="family-name"
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Zip / Postal code</label>
              <Input name="zipCode" 
                autoComplete="family-name"
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Country</label>
              <Input name="country" 
                autoComplete="family-name"
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