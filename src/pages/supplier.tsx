import SupplierTable from "@/components/supplier/supplier.table.component";
import { useSupplier } from "@/hooks/SupplierContext";
import { ISupplier } from "@/interface/ISupplier";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import React, { useCallback, useEffect, useState } from "react";

const SupplierPage: React.FC = () => {

  const [result, setResult] = useState<ISupplier[]>();

  const handleSubmit = async () => {
    router.push('/supplier/register');
  };
  
  const { supplierList } = useSupplier();

  const getSupplierList = useCallback(
    async () => {       
      const result1 = await supplierList();      
      setResult(result1);       
    },
    [supplierList],
  );

  useEffect(() => {
    getSupplierList();
  }, 
  [getSupplierList]
  );

  return(
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Suppliers
        </Typography>
      </Container>    
      <Container component="main"  sx={{ mb: 4 }}>        
        <button 
          className="btn btn-success" 
          onClick={handleSubmit}
          >Add
        </button>   
      </Container>     
      <SupplierTable
        suppliers={result}
      />    
    </React.Fragment>    
  );
}

export default SupplierPage;