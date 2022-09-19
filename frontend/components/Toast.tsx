import { Alert, Snackbar } from "@mui/material";

export const Toast = (props: {
  toast: string;
  setToast: (arg: string) => void;
}) => {
  return (
    <Snackbar open={!!props.toast} autoHideDuration={2000} onClose={() => props.setToast('')}>
      <Alert onClose={() => props.setToast('')} severity="info" sx={{ width: '100%' }}>
        {props.toast}
      </Alert>
    </Snackbar>
  )
}