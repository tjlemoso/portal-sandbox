import ClientTable from "@/components/client/client.table.component";
import { useClient } from "@/hooks/ClientContext";
import { IClient } from "@/interface/IClient";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import React, { useCallback, useEffect, useState } from "react";

const ClientPage: React.FC = () => {

  const [result, setResult] = useState<IClient[]>();

  const handleSubmit = async () => {
    router.push('/client/register');
  };
  
  const { clientList } = useClient();

  const getClientList = useCallback(
    async () => {       
      const result1 = await clientList();      
      setResult(result1);       
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