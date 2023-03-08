import * as React from 'react';
import { Container } from '@mui/system';
import ProductRegisterFormComponent from '@/components/product/product.register.component';

export default function AddressForm() {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <ProductRegisterFormComponent />
      </Container>
    </React.Fragment>
  );
}