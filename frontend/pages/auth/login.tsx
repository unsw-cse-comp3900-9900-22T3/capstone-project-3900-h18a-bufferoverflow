import {
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AuthCard } from "../../components/auth/AuthCard";
import { Template } from "../../components/generic/Template";
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { Toast } from "../../components/generic/Toast";
import { useRouter } from 'next/router';
import { NextPage } from "next";
import { useStoreUpdate } from "../../store/store";
import { convertUserToAuthProps } from "../../store/utils";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorToast, setErrorToast] = useState<string>('');
  const router = useRouter();
  const setStore = useStoreUpdate()

  return (
    <Template title="Login">
      <Toast toast={errorToast} setToast={setErrorToast} type='warning' />
      <AuthCard title="Login">
        <TextField
          id="outlined-basic"
          value={email}
          onChange={(change) => setEmail(change.target.value)}
          label="Email"
          variant="outlined"
          sx={{ marginBottom: 1, width: 280 }}
        />
        <TextField
          value={password}
          onChange={(change) => setPassword(change.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          sx={{ marginBottom: 3, width: 280 }}
        />
        <Button
          variant="outlined"
          sx={{ width: 280, mb: 2 }}
          onClick={() => {
            signInWithEmailAndPassword(getAuth(), email, password)
              .then(async (res) => {
                setStore({ auth: await convertUserToAuthProps(res.user) })
                router.push('/');
              })
              .catch(err => {
                const reason = err.code.split('/').at(-1).split('-').join(' ')
                setErrorToast('Error: ' + reason)
              })
          }}
        >
          Login
        </Button>
        <Divider sx={{ mb: 3.5, mt: 2, width: 200 }} />
        <Box sx={{}}>
          <Button variant="outlined" sx={{ width: 95, mr: 1 }} href="/auth/register">
            Register
          </Button>
          <Button variant="outlined" sx={{ width: 175 }} href="/auth/reset-password">
            Reset Password
          </Button>
        </Box>
      </AuthCard>
    </Template>
  );
};

export default Login
