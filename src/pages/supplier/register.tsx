import * as React from 'react';
import SupplierRegisterFormComponent from '@/components/supplier/supplier.register.component';


export default function AddressForm() {

  return (
    <div>
      <h3 className="text-center">Supplier</h3>
      <div style={{marginTop: 50}}>
        <SupplierRegisterFormComponent          
        />
      </div>
    </div>
  );
}