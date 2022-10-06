import { Alert, Snackbar } from "@mui/material";

export const Toast = (props: {
  toast: string;
  setToast: (arg: string) => void;
  type?: "error" | "warning" | "info" | "success"
}) => {
  const type = props.type ? props.type : 'info'
  return (
    <Snackbar open={!!props.toast} autoHideDuration={2000} onClose={() => props.setToast('')}>
      <Alert onClose={() => props.setToast('')} severity={type} sx={{ width: '100%' }}>
        {props.toast}
      </Alert>
    </Snackbar>
  )
}