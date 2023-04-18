import React from "react";
import { IDelivery } from "../../interface/IDelivery";
import Container from '@mui/material/Container';
import router from "next/router";
import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { deleteDelivery } from "@/services/DeliveryService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


interface IProps {
  deliveries: IDelivery[] | undefined;
}

function Row(props: { row: IDelivery }) {
  const { row } = props;

  const handleEdit = async (id : number) => {
    router.push(`/delivery/register?id=${id}`);
  };

  const handleDelete= React.useCallback( 
    async (id : number) => {
      console.log("id", id);
      await deleteDelivery(id);
      router.reload();
    },
    [],
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>        
        <TableCell>{row.status}</TableCell>
        <TableCell align="left">{row.trackingCode}</TableCell>
        <TableCell align="left">
          <button className="btn btn-primary" onClick={() => handleEdit(row.deliveryId)}>{<EditIcon/>}</button>              
          <button className="btn btn-danger" onClick={() => handleDelete(row.deliveryId)}>{<DeleteIcon />}</button>          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const DeliveryTable: React.FunctionComponent<IProps> = props => {

  return (
    <Container component="main" >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="left">Código de Rastreio</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.deliveries && props.deliveries.length > 0 ? 
                (
                  props.deliveries.map((row) => (
                    <Row key={row.deliveryId} row={row} />
                  ))
                ):
                (
                  <tr>
                    <td colSpan={3}>no delivery</td>
                  </tr>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default DeliveryTable;
