import { Box, Button, Card, Divider, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { AuthCard } from "../components/AuthCard"
import { Template } from "../components/Template"
import loginTextFieldStyles from "../styles/style"

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Template title="Login">
      <Box sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AuthCard title="Login">
          <TextField
            id="outlined-basic"
            value={email}
            onChange={change => setEmail(change.target.value)}
            label="Email"
            variant="outlined"
            sx={ loginTextFieldStyles }
          />
          <TextField
            value={password}
            onChange={change => setPassword(change.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type='password'
            sx={ loginTextFieldStyles }
          />
          <Button
            variant="outlined"
            sx={{ width: 270, mb: 2 , mt: 2}}
            onClick={() => {
              setEmail('')
              setPassword('')
            }}
          >
            Login
          </Button>
          <Divider sx={{ mb: 3.5, mt: 2, width: 200 }} />
          <Box sx={{

          }}>
            <Button
              variant="outlined"
              sx={{ width: 100, mr: 1 }}
              href="/register"
            >
              Register
            </Button>
            <Button
              variant="outlined"
              sx={{ width: 170 }}
              href="/reset-password"
            >
              Reset Password
            </Button>
          </Box>
        </AuthCard>
      </Box>
    </Template >
  )
}

export default Login;
