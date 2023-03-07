import React from "react";
import { ISupplier } from "../../interface/ISupplier";
import Container from '@mui/material/Container';
import { useSupplier } from "@/hooks/SupplierContext";
import router from "next/router";
import { Paper } from "@mui/material";

interface IProps {
  suppliers: ISupplier[] | undefined;
}

const SupplierTable: React.FunctionComponent<IProps> = props => {

  const { remove } = useSupplier();

  const handleDelete= React.useCallback( 
    async (id : number) => {
      console.log("id", id);
      remove(id);
      router.reload();
    },
    [remove],
  );

  const handleEdit = async (id : number) => {
    router.push(`/supplier/register?id=${id}`);
  };

  return (
    <Container component="main"  sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Identity</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.suppliers && props.suppliers.length > 0 ? (
              props.suppliers.map(i => (
                <tr key={i.supplierId}>
                  <td>{i["name"]}</td>
                  <td>{i["phone"]}</td>
                  <td>{i["email"]}</td>
                  <td>{i["identity"]}</td>
                  <td>{i["description"]}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(i.supplierId)}>edit</button>                  
                    <button className="btn btn-danger" onClick={() => handleDelete(i.supplierId)}>delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>no suppliers</td>
              </tr>
            )}
          </tbody>
        </table>
    </Paper>
    </Container>
  );
};
export default SupplierTable;
