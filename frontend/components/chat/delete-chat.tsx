import {IconButton, Button} from "@mui/material"
import DeleteForever from "@mui/icons-material/DeleteForever"
import { useState } from "react"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const DeleteChat = (props: {
    delHref: string
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton
        size="large"
        aria-label="delete chat history with this user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <DeleteForever />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ titleAlign: "center" }}>
          {"Are you sure you want to delete this chat?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-around"}}>
          <Button
            variant="outlined"
            sx={{ width: 135, mr: 1 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 135, mr: 1 }}
            onClick={handleClose}
            autoFocus
            href={props.delHref}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


