import * as React from 'react';
import { Container } from '@mui/system';
import WarehouseRegisterFormComponent from '@/components/warehouse/warehouse.register.component';

export default function AddressForm() {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <WarehouseRegisterFormComponent />
      </Container>
    </React.Fragment>
  );
}