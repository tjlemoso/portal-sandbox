import * as React from 'react';
import { Container } from '@mui/system';
import UserRegisterFormComponent from '@/components/user/user.register.component';

export default function AddressForm() {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <UserRegisterFormComponent />
      </Container>
    </React.Fragment>
  );
}