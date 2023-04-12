import WarehouseTable from "@/components/warehouse/warehouse.table.component";
import { useWarehouse } from "@/hooks/WarehouseContext";
import { IWarehouse } from "@/interface/IWarehouse";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import React, { useCallback, useEffect, useState } from "react";
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

const WarehousePage: React.FC = () => {

  const [result, setResult] = useState<IWarehouse[]>();

  const handleSubmit = async () => {
    router.push('/warehouse/register');
  };
  
  const { warehouseList } = useWarehouse();

  const [openLoadding, setOpenLoadding] = React.useState(true);
  const getWarehouseList = useCallback(
    async () => {       
      const result1 = await warehouseList();      
      setResult(result1); 
      setOpenLoadding(false);         
    },
    [warehouseList],
  );

  useEffect(() => {
    getWarehouseList();
  }, 
  [getWarehouseList]
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
          Warehouses
        </Typography>
      </Container>    
      <Container component="main"  sx={{ mb: 4 }}>        
        <button 
          className="btn btn-success" 
          onClick={handleSubmit}
          >Add
        </button>   
      </Container>     
      <WarehouseTable
        warehouses={result}
      />    
    </React.Fragment>    
  );
}

export default WarehousePage;

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