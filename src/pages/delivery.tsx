import DeliveryTable from "@/components/delivery/delivery.table.component";
import { IDelivery } from "@/interface/IDelivery";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import React from "react";
import { getDeliveries } from "@/services/DeliveryService";

interface Props {
  deliveries: IDelivery[];
}

const DeliveryPage: React.FC<Props> = (props:Props) => {

  const handleSubmit = async () => {
    router.push('/delivery/register');
  };
  
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
          Entregas
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
        deliveries={props.deliveries}
      />    
    </React.Fragment>    
  );
}

export default DeliveryPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: `/signIn`,
        permanent: false,
      }
    }
  }
  
  const deliveries = await getDeliveries();
  return {
    props: {
      deliveries
    }
  }
}