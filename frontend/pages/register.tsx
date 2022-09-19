import { Box, Button, Card, Divider, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { AuthCard } from "../components/AuthCard"
import { Template } from "../components/Template"
import loginTextFieldStyles from "../styles/style"

export const Register = () => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <Template title="Register">
      <Box sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AuthCard title="Register">
          <TextField
            id="outlined-basic"
            value={username}
            onChange={change => setUsername(change.target.value)}
            label="Username"
            variant="outlined"
            sx={ loginTextFieldStyles }>
          </TextField>
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
            sx={{ width: 280, mb: 2, mt: 2 }}
            onClick={() => {
              setEmail('')
              setPassword('')
            }}
          >
            Sign up
          </Button>
          <Divider sx={{ mb: 3.5, mt: 2, width: 220 }} />
          <Box sx={{

          }}>
            <Button
              variant="outlined"
              sx={{ width: 100, mr: 1 }}
              href="/login"
            >
              Login
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

export default Register