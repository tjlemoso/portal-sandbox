import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    openDialog: boolean;
    handleClose: () => void;
}
const AlertDialog: React.FunctionComponent<Props> = props => {
  const [open, setOpen] = React.useState(props.openDialog);

  React.useEffect(() => {
    setOpen(props.openDialog);
  }, [props.openDialog]);

  return (
    <div>
      <Dialog
          open={open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"GSL"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            As alterações solicitadas foram aplicadas com sucesso em nosso sistema. Obrigado por sua atualização e por confiar em nosso serviço.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              autoFocus
              onClick={props.handleClose}
            >
              OK
            </Button>  
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default AlertDialog;