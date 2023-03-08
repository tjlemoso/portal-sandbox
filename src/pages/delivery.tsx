import DeliveryTable from "@/components/delivery/delivery.table.component";
import { useDelivery } from "@/hooks/DeliveryContext";
import { IDelivery } from "@/interface/IDelivery";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import React, { useCallback, useEffect, useState } from "react";

const DeliveryPage: React.FC = () => {

  const [result, setResult] = useState<IDelivery[]>();

  const handleSubmit = async () => {
    router.push('/delivery/register');
  };
  
  const { deliveryList } = useDelivery();

  const getDeliveryList = useCallback(
    async () => {       
      const result1 = await deliveryList();      
      setResult(result1);       
    },
    [deliveryList],
  );

  useEffect(() => {
    getDeliveryList();
  }, 
  [getDeliveryList]
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
          Deliverys
        </Typography>
      </Container>    
      <Container component="main"  sx={{ mb: 4 }}>        
        <button 
          className="btn btn-success" 
          onClick={handleSubmit}
          >Add
        </button>   
      </Container>     
      <DeliveryTable
        deliverys={result}
      />    
    </React.Fragment>    
  );
}

export default DeliveryPage;