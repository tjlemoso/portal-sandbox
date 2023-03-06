import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router from 'next/router';
import { useSupplier } from '@/hooks/SupplierContext';
import { ISupplier } from '@/interface/ISupplier';

export default function SupplierRegisterFormComponent() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create } = useSupplier();

  const handleSubmit= React.useCallback( 
    async (data : ISupplier) => {
      create({...data});
    },
    [create],
  );

  const handleBack = async () => {
    router.push('/supplier');
  };

  return (
    <Container component="main"  sx={{ mb: 4 }}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Grid container spacing={3}  style={{border: 1, borderColor:  'rgba(0, 0, 0, 0.12)', borderStyle: 'solid'}}>
          <Grid item xs={12} sm={6} style={{display: 'grid'}}>
            <label>Name</label>
            <Input name="name" 
              autoComplete="family-name"
              />
          </Grid>
          <Grid item xs={12} sm={6} style={{display: 'grid'}}>
            <label>Phone Number</label>
            <Input name="phone" 
              autoComplete="family-name"
              />
          </Grid>
          <Grid item xs={12} sm={6} style={{display: 'grid'}}>
            <label>Email</label>
            <Input name="email" 
              autoComplete="family-name"
              />
          </Grid>
          <Grid item xs={12} sm={6} style={{display: 'grid'}}>
            <label>Identity</label>
            <Input name="identity" 
              autoComplete="family-name"
              />
          </Grid>     
          <Grid item xs={12} style={{display: 'grid'}}>
            <label>Description</label>
              <Input name="description" 
                autoComplete="family-name"
                />
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
    </Container>
  );
}