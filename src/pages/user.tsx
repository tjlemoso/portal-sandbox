import UserTable from "@/components/user/user.table.component";
import { useUser } from "@/hooks/UserContext";
import { IUser } from "@/interface/IUser";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import React, { useCallback, useEffect, useState } from "react";

const UserPage: React.FC = () => {

  const [result, setResult] = useState<IUser[]>();

  const handleSubmit = async () => {
    router.push('/user/register');
  };
  
  const { userList } = useUser();

  const [openLoadding, setOpenLoadding] = React.useState(true);
  const getUserList = useCallback(
    async () => {       
      const result1 = await userList();      
      setResult(result1); 
      setOpenLoadding(false);          
    },
    [userList],
  );

  useEffect(() => {
    getUserList();
  }, 
  [getUserList]
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
          Users
        </Typography>
      </Container>    
      <Container component="main"  sx={{ mb: 4 }}>        
        <button 
          className="btn btn-success" 
          onClick={handleSubmit}
          >Add
        </button>   
      </Container>     
      <UserTable
        users={result}
      />    
    </React.Fragment>    
  );
}

export default UserPage;

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
