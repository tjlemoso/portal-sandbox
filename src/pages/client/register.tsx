import * as React from 'react';
import { Container } from '@mui/system';
import ClientRegisterFormComponent from '@/components/client/client.register.component';

export default function AddressForm() {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <ClientRegisterFormComponent />
      </Container>
    </React.Fragment>
  );
}