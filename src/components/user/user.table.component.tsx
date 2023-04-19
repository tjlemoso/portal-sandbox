import React from "react";
import { IUser } from "../../interface/IUser";
import Container from '@mui/material/Container';
import router from "next/router";
import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { deleteUser } from "@/services/UserService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
  users: IUser[] | undefined;
}

function Row(props: { row: IUser }) {
  const { row } = props;

  const handleEdit = async (id : number) => {
    router.push(`/user/register?id=${id}`);
  };

  const handleDelete= React.useCallback( 
    async (id : number) => {
      console.log("id", id);
      await deleteUser(id);
      router.reload();
    },
    [],
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.isAdmin? "Administrador" : "Operador"}
        </TableCell>
        <TableCell align="left">
          <button className="btn btn-primary" onClick={() => handleEdit(row.userId)}>{<EditIcon/>}</button>
          <label style={{width: "10px"}}/>              
          <button className="btn btn-danger" onClick={() => handleDelete(row.userId)}>{<DeleteIcon />}</button>          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const UserTable: React.FunctionComponent<IProps> = props => {

  return (
    <Container component="main" >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="left">Tipo de Usuário</TableCell>
              <TableCell></TableCell>              
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.users && props.users.length > 0 ? 
                (
                  props.users.map((row) => (
                    <Row key={row.name} row={row} />
                  ))
                ):
                (
                  <tr>
                    <td colSpan={3}>no user</td>
                  </tr>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default UserTable;
