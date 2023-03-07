import * as React from 'react';
import SupplierRegisterFormComponent from '@/components/supplier/supplier.register.component';
import { Container } from '@mui/system';


export default function AddressForm() {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <SupplierRegisterFormComponent />
      </Container>
    </React.Fragment>

  );
}