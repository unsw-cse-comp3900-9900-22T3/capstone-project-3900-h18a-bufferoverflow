import { Box, Button, Card, Divider, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Template } from "../components/Template"

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <Template title="Login">
      <Box sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Card
          variant="outlined"
          sx={{
            width: 420,
            minHeight: 400,
            padding: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
            flexDirection: 'column'
          }}
        >
          <Typography variant="h5" color='primary' component="h2">
            Login
          </Typography>
          <Divider sx={{ mb: 5, mt: 2, width: 200 }} />
          <TextField
            id="outlined-basic"
            value={email}
            onChange={change => setEmail(change.target.value)}
            label="Email"
            variant="outlined"
            sx={{ marginBottom: 1, width: 250 }}
          />
          <TextField
            value={password}
            onChange={change => setPassword(change.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type='password'
            sx={{ marginBottom: 3, width: 250 }}
          />
          <Button
            variant="outlined"
            sx={{ width: 250, mb: 2 }}
            onClick={() => {
              setEmail('')
              setPassword('')
            }}
          >
            Login
          </Button>
        </Card>
      </Box>
    </Template >
  )
}

export default Login