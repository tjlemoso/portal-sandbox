import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  openComponent: boolean;
}
const SimpleBackdrop: React.FunctionComponent<Props> = (props) => {
  const [open, setOpen] = React.useState(props.openComponent);

  React.useEffect(() => {
    setOpen(props.openComponent);
  }, [props.openComponent]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SimpleBackdrop;
