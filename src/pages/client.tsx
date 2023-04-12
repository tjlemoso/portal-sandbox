import ClientTable from "@/components/client/client.table.component";
import { useClient } from "@/hooks/ClientContext";
import { IClient } from "@/interface/IClient";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

const ClientPage: React.FC = () => {

  const [result, setResult] = useState<IClient[]>();
  const [openLoadding, setOpenLoadding] = React.useState(true);

  const handleSubmit = async () => {
    router.push('/client/register');
  };
  
  const { clientList } = useClient();

  const getClientList = useCallback(
    async () => {       
      const result1 = await clientList();      
      setResult(result1); 
      setOpenLoadding(false);
    },
    [clientList],
  );

  useEffect(() => {
    getClientList();
  }, 
  [getClientList]
  );

  return(
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoadding}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Clients
        </Typography>
      </Container>    
      <Container component="main"  sx={{ mb: 4 }}>        
        <button 
          className="btn btn-success" 
          onClick={handleSubmit}
          >Add
        </button>   
      </Container>     
      <ClientTable
        clients={result}
      />    
    </React.Fragment>    
  );
}

export default ClientPage;

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
  return {
    props: {

    }
  }
}
