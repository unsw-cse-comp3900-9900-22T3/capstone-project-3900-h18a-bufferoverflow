import {IconButton, Button} from "@mui/material"
import DeleteForever from "@mui/icons-material/DeleteForever"
import { Dispatch, SetStateAction, useState } from "react"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { gql, useMutation } from "@apollo/client";

const DELETE_CONVERSATION = gql`
  mutation ($conversation: String!) {
    deleteConversation(conversation: $conversation) {
      success
    }
  }
`

export const DeleteChat = (props: {
    conversation: string
    setExists: Dispatch<SetStateAction<boolean>>
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [deleteConversation, { loading, error, data }] = useMutation(DELETE_CONVERSATION);


  const handleDelete = () => {
    deleteConversation({ variables: { conversation: props.conversation}});
    props.setExists(false);
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
        <DialogTitle id="alert-dialog-title" sx={{ titleAlign: "center", mt: 1 }}>
          {"Are you sure you want to delete this chat?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center", justifyContent: "center" }}
          >
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="outlined"
            sx={{ width: 135, mr: 1, borderRadius: 30, mb: 1, height: 45 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 135, mr: 1, borderRadius: 30, mb:1,  height: 45 }}
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


