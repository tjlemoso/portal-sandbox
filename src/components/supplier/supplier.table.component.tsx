import React from "react";
import { ISupplier } from "../../interface/ISupplier";
import Container from '@mui/material/Container';
import router from "next/router";
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { deleteSupplier } from "@/services/SupplierService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
  suppliers: ISupplier[] | undefined;
}

function Row(props: { row: ISupplier }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const handleEdit = async (id : number) => {
    router.push(`/supplier/register?id=${id}`);
  };

  const handleDelete= React.useCallback( 
    async (id : number) => {
      console.log("id", id);
      await deleteSupplier(id);
      router.reload();
    },
    [],
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">
          <button className="btn btn-primary" onClick={() => handleEdit(row.supplierId)}>{<EditIcon/>}</button>
          <label style={{width: "10px"}}/>              
          <button className="btn btn-danger" onClick={() => handleDelete(row.supplierId)}>{<DeleteIcon />}</button>          
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Address
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Endereço</TableCell>
                    <TableCell>Complemento</TableCell>
                    <TableCell align="left">Cidade</TableCell>
                    <TableCell align="left">Estado</TableCell>
                    <TableCell align="left">Código Postal</TableCell>
                    <TableCell align="left">País</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>              
                  <TableRow key={row.address}>
                    <TableCell component="th" scope="row">
                      {row.address}
                    </TableCell>
                    <TableCell>{row.address2}</TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="left">{row.state}</TableCell>
                    <TableCell align="left">{row.zip}</TableCell>
                    <TableCell align="left">{row.country}</TableCell>
                  </TableRow>                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      
      </TableRow>
    </React.Fragment>
  );
}



const SupplierTable: React.FunctionComponent<IProps> = props => {

  return (
    <Container component="main" >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nome</TableCell>
              <TableCell align="left">Telefone</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.suppliers && props.suppliers.length > 0 ? 
                (
                  props.suppliers.map((row) => (
                    <Row key={row.name} row={row} />
                    ))
                ):
                (
                  <tr>
                    <td colSpan={3}>no suppliers</td>
                  </tr>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default SupplierTable;
