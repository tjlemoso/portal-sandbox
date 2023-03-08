import * as React from 'react';
import { Container } from '@mui/system';
import DeliveryRegisterFormComponent from '@/components/delivery/delivery.register.component';

export default function AddressForm() {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <DeliveryRegisterFormComponent />
      </Container>
    </React.Fragment>
  );
}