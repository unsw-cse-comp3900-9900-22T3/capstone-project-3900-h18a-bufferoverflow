import {
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AuthCard } from "../components/AuthCard";
import { Template } from "../components/Template";
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { Toast } from "../components/Toast";
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toast, setToast] = useState<string>('');
  const router = useRouter();

  return (
    <Template title="Login">
      <Toast toast={toast} setToast={setToast} />
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
              .then(res => {
                console.log(res)
                router.push('/')
              })
              .catch(err => {
                setToast('Email or password is not valid')
              })
            setEmail("");
            setPassword("");
          }}
        >
          Login
        </Button>
        <Divider sx={{ mb: 3.5, mt: 2, width: 200 }} />
        <Box sx={{}}>
          <Button variant="outlined" sx={{ width: 95, mr: 1 }} href="/register">
            Register
          </Button>
          <Button variant="outlined" sx={{ width: 175 }} href="/reset-password">
            Reset Password
          </Button>
        </Box>
      </AuthCard>
    </Template>
  );
};

export default Login;
