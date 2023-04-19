import React from "react";
import { IProduct } from "../../interface/IProduct";
import Container from '@mui/material/Container';
import router from "next/router";
import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { deleteProduct } from "@/services/ProductService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


interface IProps {
  products: IProduct[] | undefined;
}

function Row(props: { row: IProduct }) {
  const { row } = props;

  const handleEdit = async (id : number) => {
    router.push(`/product/register?id=${id}`);
  };

  const handleDelete= React.useCallback( 
    async (id : number) => {
      console.log("id", id);
      await deleteProduct(id);
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
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">{row.availableQuantity}</TableCell>
        <TableCell align="left">
          <button className="btn btn-primary" onClick={() => handleEdit(row.productId)}>{<EditIcon/>}</button>
          <label style={{width: "10px"}}/>              
          <button className="btn btn-danger" onClick={() => handleDelete(row.productId)}>{<DeleteIcon />}</button>          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ProductTable: React.FunctionComponent<IProps> = props => {

  return (
    <Container component="main" >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="left">Descrição</TableCell>
              <TableCell align="left">Quantidade</TableCell>
              <TableCell></TableCell>       
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.products && props.products.length > 0 ? 
                (
                  props.products.map((row) => (
                    <Row key={row.name} row={row} />
                  ))
                ):
                (
                  <tr>
                    <td colSpan={3}>no product</td>
                  </tr>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default ProductTable;
