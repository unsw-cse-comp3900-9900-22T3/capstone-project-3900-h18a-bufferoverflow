import { AuthCard } from "../../components/auth/AuthCard";
import { Template } from "../../components/generic/Template";
import { useState } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Toast } from "../../components/generic/Toast";
import { parseFirebaseError } from "../../utils/utils";

const title = 'Reset Password'

export const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [errorToast, setErrorToast] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string>('');

  return (
    <Template title={title}>
      <Toast toast={errorToast} setToast={setErrorToast} type='warning' />
      <Toast toast={successToast} setToast={setSuccessToast} type='success' />
      <AuthCard title={title}>
        <TextField
          id='outlined-basic'
          value={email}
          onChange={(change) => setEmail(change.target.value)}
          label="Email"
          variant="outlined"
          sx={{ marginBottom: 1, width: 280 }}
        />
        <Button
          variant="outlined"
          sx={{ width: 280, mb: 2 }}
          onClick={() => {
            sendPasswordResetEmail(getAuth(), email)
              .then(res => {
                setSuccessToast('Reset password email sent')
              })
              .catch(err => {
                setErrorToast('Error: ' + parseFirebaseError(err.code))
              })
          }}
        >
          Reset
        </Button>
        <Divider sx={{ mb: 3.5, mt: 2, width: 220 }} />
        <Box>
          <Button variant="outlined" sx={{ width: 135, mr: 1 }} href="/auth/login">
            Login
          </Button>
          <Button variant="outlined" sx={{ width: 135 }} href="/auth/register">
            Register
          </Button>
        </Box>
      </AuthCard>
    </Template>
  )
}

export default ResetPassword
