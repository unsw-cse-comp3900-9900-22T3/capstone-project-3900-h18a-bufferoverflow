import { Template } from "../components/Template";
import { useState } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Toast } from "../components/Toast";
import AuthCard from "../components/AuthCard";

const title = "Reset Password"

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
          id="outlined-basic"
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
                setErrorToast('Email is not valid')
              })
          }}
        >
          Reset
        </Button>
        <Divider sx={{ mb: 3.5, mt: 2, width: 220 }} />
        <Box>
          <Button variant="outlined" sx={{ width: 135, mr: 1 }} href="/login">
            Login
          </Button>
          <Button variant="outlined" sx={{ width: 135 }} href="/register">
            Register
          </Button>
        </Box>
      </AuthCard>
    </Template>
  );
};
