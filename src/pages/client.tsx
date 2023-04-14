import ClientTable from "@/components/client/client.table.component";
import { useClient } from "@/hooks/ClientContext";
import { IClient } from "@/interface/IClient";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { get } from '../services/ClientService';

interface Props {
  clients: IClient[];
}

const ClientPage: React.FC<Props> = (props:Props) => {

  const handleSubmit = async () => {
    router.push('/client/register');
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
        clients={props.clients}
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

  const clients = await get();      
  return {
    props: {
      clients
    }
  }

}
